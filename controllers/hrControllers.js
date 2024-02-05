
const Joi=require('joi');

const common=require("../helpers/common")
const ApiResponse=require('../utils/ApiResponse')

const hrServices=require('../services/hrServices')
const employerServices=require('../services/employerServices')
const logServices=require('../services/logServices')
const managementServices=require('../services/managementServices')
const candidateServices=require('../services/candidateServices')





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

        const existingHr = await hrServices.existUser(data.username);
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
        


        const savedData= await hrServices.saveHr(hrData);
       
        return ApiResponse.saveResponse(res,savedData);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}
