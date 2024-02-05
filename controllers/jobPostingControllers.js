// const candidateModel=require('../schemas/candidateModel')
const jobPostingModel=require('../schemas/jobPostingModel')
const Joi=require('joi')
const logModel=require('../schemas/logModel')
const ApiResponse=require('../utils/ApiResponse')

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

        const savedData= await jobPostingModel.saveJobPost(jobPost);
       

        return ApiResponse.saveResponse(res,savedData);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}



exports.getAllJobPostings=async (req,res)=>{
    try{

       

        const jobPosts= await jobPostingModel.getAllJobPostings();
       

        return ApiResponse.sendDataResponse(res,jobPosts);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}



exports.getJobPostById=async (req,res)=>{
    try{

       
        const jobId=req.params.jobPostingId

        const where_cls={jobPostingId:jobId}

        const post= await jobPostingModel.getJobPostById(where_cls);
       
        

        return ApiResponse.sendDataResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.updateJobPost=async (req,res)=>{
    try{

       
        const updatedData=req.body;

        const jobId=req.body.jobPostId


        const post= await jobPostingModel.updateJobPost(jobId,updatedData);
       
        

        return ApiResponse.updateResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}




exports.deleteJobPost=async (req,res)=>{
    try{

       
        const jobId=req.params.jobPostId

        const post= await jobPostingModel.deleteJobPost(jobId);

        return ApiResponse.deleteResponse(res,post);

    }
    catch(error)
    {
        console.log(error)
        await logModel.Insert({ data: req.body, stack: error.stack }, error);
        return ApiResponse.serverIssueResponse(res, error);
    }
}

