
const Joi=require('joi')
const ApiResponse=require('../utils/ApiResponse')
const common=require('../helpers/common')

const hrServices=require('../services/hrServices')
const employerServices=require('../services/employerServices')
const logServices=require('../services/logServices')
const managementServices=require('../services/managementServices')
const candidateServices=require('../services/candidateServices')


exports.saveCandidate= async (req,res)=>{
    try{
        console.log("this is the body")
        console.log(req.body)
        const schema=Joi.object({
            // candidateId:Joi.string().trim().regex(/^C/).required(),
            firstName: Joi.string().trim().required(),
            // lastName: Joi.string().trim().required(),
            mobileNumber: Joi.string().trim().required(),
            graduation: Joi.string().trim(), 
            technicalSkills: Joi.string().trim().required(),
            
        }).unknown(true)

        const { error, value } = schema.validate(req.body);
        if (error) {
            return ApiResponse.validationsResponse(res,error)
        }

        const data=req.body


        const existingCandidate = await candidateServices.existUser(data.email);

        if(existingCandidate)
        {
            return ApiResponse.entityAlreadyExists(res, 'Candidate already registered with this email');
        }


        const candidateData={
           fullName:data.firstName+data.lastName,
            mobileNumber:data.mobileNumber,
            dob:data.dob,
            email:data.email,
            projects:data.projects,
            graduation:data.graduation,
            postGraduation:data.postGraduation,
            certifications:data.certifications,
            technicalSkills:data.technicalSkills,
            currentCity:data.currentCity,
            currentState:data.currentState,
            currentCountry:data.currentCountry,
            preferredLocation:data.preferredLocation,
            currency:data.currency,
            currentCTC:data.currentCTC,
            expectedCTC:data.expectedCTC,
            noticePeriod:data.noticePeriod,
            isDeleted:0
        }


        if (req.files) {
            for (const fileType in req.files) {
              const filesOfType = req.files[fileType];
               
                // Handle the case when there's a single file for a file type
                const file = filesOfType;
                console.log(file[0].fieldname)
               
                const newFile = {
                  name: file[0].key,
                  url: file[0].location,
                };
                
          
                // Assuming you want to set properties based on file type
                if (file[0].fieldname == 'resume') {
                    console.log(newFile.name)
                  candidateData.resume={resumeName:newFile.name,resumeUrl:newFile.url}
                } else if (file[0].fieldname == 'cv') {
                  candidateData.CV={CVName:newFile.name,CVUrl:newFile.url}
                
              }
            }
          }


        const savedData= await candidateServices.saveCandidate(candidateData);
       

        return ApiResponse.saveResponse(res,savedData);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}



 

exports.getAllCandidates=async (req,res)=>{
    try{

        const candidates= await candidateServices.getAllCandidates();
       

        return ApiResponse.sendDataResponse(res,candidates);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.getCandidateById=async (req,res)=>{
    try{

       
        const candidateId=req.params.candidateId

        const where_cls={candidateId:candidateId}

        const post= await candidateServices.getCandidateById(where_cls);
       
        

        return ApiResponse.sendDataResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.updateCandidate=async (req,res)=>{
    try{

       
        const updatedData=req.body;

        const candidateId=req.params.candidateId


        const post= await candidateServices.updateCandidate(candidateId,updatedData);
       
        

        return ApiResponse.updateResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.deleteCandidate=async (req,res)=>{
    try{

       
        const candidateId=req.params.candidateId

        const candidate= await candidateServices.deleteCandidate(candidateId);

        return ApiResponse.deleteResponse(res,candidate);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}








