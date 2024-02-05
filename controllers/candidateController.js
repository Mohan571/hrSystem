const candidateModel=require('../schemas/candidateModel')
const Joi=require('joi')
const logModel=require('../schemas/logModel')
const ApiResponse=require('../utils/ApiResponse')
const common=require('../helpers/common')

exports.saveCandidate= async (req,res)=>{
    try{
        console.log("this is the body")
        console.log(req.body)
        const schema=Joi.object({
            candidateId:Joi.string().trim().regex(/^C/).required(),
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


        const existingCandidate = await candidateModel.existUser(data.email);

        if(existingCandidate)
        {
            return ApiResponse.entityAlreadyExists(res, 'Candidate already registered with this email');
        }


        const candidateData={
            candidateId:data.candidateId,
           fullName:data.firstName+data.lastName,
            mobileNumber:data.mobileNumber,
            dob:data.dob,

            email:data.email,
            projects:data.projects,
            graduation:data.graduation,
            postGraduation:data.postGraduation,
            certifications:data.certifications,
            technicalSkills:data.technicalSkills,
            currentLocation:data.currentLocation,
            preferredLocation:data.preferredLocation,
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
                //   candidateData.CV.CVUrl = newFile.url;
                
              }
            }
          }
          

      



        const savedData= await candidateModel.saveCandidate(candidateData);
       

        return ApiResponse.saveResponse(res,savedData);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}
