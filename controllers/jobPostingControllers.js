
const Joi=require('joi')

const ApiResponse=require('../utils/ApiResponse')

const hrServices=require('../services/hrServices')
const employerServices=require('../services/employerServices')
const logServices=require('../services/logServices')
const managementServices=require('../services/managementServices')
const candidateServices=require('../services/candidateServices')
const jobPostingServices=require('../services/jobPostServices')



exports.saveJobPosting=async (req,res)=>{
    try{

        console.log(req.body)
        const schema=Joi.object({
           
            jobDescription: Joi.string().trim().required(),
            role: Joi.string().trim().required(),
            location: Joi.string().trim().required(),
            experience: Joi.string().trim()
            
            
        }).unknown(true)

        const { error, value } = schema.validate(req.body);
        if (error) {
            return ApiResponse.validationsResponse(res,error)
        }

        const data=req.body

    
        const jobPost={
           jobPostingId:data.jobPostId,
           jobDescription:data.jobDescription,
           role:data.role,
           location:data.location,
           noticePeriod:data.noticePeriod,
           experience:data.experience,
           createdBy:req.login.user_id,
           status:1,
           isDeleted:0
        }

        const savedData= await jobPostingServices.saveJobPost(jobPost);
       

        return ApiResponse.saveResponse(res,savedData);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}



exports.getAllJobPostings=async (req,res)=>{
    try{

       

        const jobPosts= await jobPostingServices.getAllJobPostings();
       

        return ApiResponse.sendDataResponse(res,jobPosts);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}



exports.getJobPostById=async (req,res)=>{
    try{

       
        const jobId=req.params.jobPostingId

        const where_cls={jobPostingId:jobId}

        const post= await jobPostingServices.getJobPostById(where_cls);
       
        

        return ApiResponse.sendDataResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.updateJobPost=async (req,res)=>{
    try{

       
        const updatedData=req.body;

        const jobId=req.body.jobPostId


        const post= await jobPostingServices.updateJobPost(jobId,updatedData);
       
        

        return ApiResponse.updateResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.deleteJobPost=async (req,res)=>{
    try{

       
        const jobId=req.params.jobPostId

        const post= await jobPostingServices.deleteJobPost(jobId);

        return ApiResponse.deleteResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logServices.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}

