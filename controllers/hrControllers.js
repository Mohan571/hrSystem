const managementModel=require('../schemas/managementModel')
const Joi=require('joi');
const logModel=require('../schemas/logModel');
const hrModel=require('../schemas/hrModel')
const employerModel=require('../schemas/employerModel')
// const hrModel=require('../schemas/HR')

const common=require("../helpers/common")
const ApiResponse=require('../utils/ApiResponse')





exports.createHrLogin= async (req,res)=>{
    try{

        console.log(req.body)
        const schema=Joi.object({
            HrId:Joi.string().trim().regex(/^HR/).required(),
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            mobileNumber: Joi.string().trim().required(),
            alternateMobileNumber: Joi.string().trim().allow(''), 
            username: Joi.string().trim().required(),
       
            workEmail: Joi.string().trim().required(),
            role: Joi.string().required(),
            password: Joi.string().min(8)
                .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')).required()
        }).unknown(true)

        const { error, value } = schema.validate(req.body);
        if (error) {
            return ApiResponse.validationsResponse(res,error)
        }

        const data=req.body


        // console.log(data)
        let en_p = await common.passendep(data.password, 'en');

        // data.password=en_p;

        const existingHr = await hrModel.existUser(data.username);
        if(existingHr)
        {
            return ApiResponse.entityAlreadyExists(res, 'Username already exists');
        }

        const hrData={
            HrId:data.HrId,
            firstName:data.firstName,
            lastName:data.lastName,
            mobileNumber:data.mobileNumber,
            alternateMobileNumber:data.alternateMobileNumber,
            username:data.username,
            password:en_p,
            workEmail:data.workEmail,
            role:data.role,
            moduleAccess:data.moduleAccess,
            status:'active',
            isDeleted:0
        }

        console.log("this is the file",req.file)
        console.log(process.env.S3BucketName)
        if(req.file)
        {
            console.log("hello")
            const fileName = req.file.key; // The key is the file name on S3
            const fileUrl = req.file.location; // The location is the URL to access the file on S3
        
            hrData.profileImageUrl=fileUrl;
            hrData.profileImageName=fileName;
        }
        


        const savedData= await hrModel.saveHr(hrData);
       
        return ApiResponse.saveResponse(res,savedData);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}
