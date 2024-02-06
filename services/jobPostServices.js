// const logModel=require('../schemas/logModel')
const logServices=require('./logServices')

const Messages=require('../utils/messages')
const jobPostingModel=require('../schemas/jobPostingModel')

exports.saveJobPost=async function(data){
    try{
        
      const newJobPost=new jobPostingModel(data)
          
      const result=await newJobPost.save()
  
      return result;
  
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToSaveEntity);
    }


  }


exports.getAllJobPostings=async function(page,limit){
  try{
      
    const skip=(page-1)*limit;
    
        
    const result=await jobPostingModel.find().skip(skip).limit(limit)

    return result;

  }
  catch(error)
  {
    console.log(error);
    await logServices.Insert({ data, stack: error.stack }, error);
    throw new Error(Messages.UnableToGetEntity);
  }


}

exports.getJobPostById=async function(where_cls){
  try{
      
    
        
    const result=await jobPostingModel.findOne(where_cls)

    return result;

  }
  catch(error)
  {
    console.log(error);
    await logServices.Insert({ data, stack: error.stack }, error);
    throw new Error(Messages.UnableToGetEntityById);
  }


}



exports.updateJobPost = async function (jobPostId, updateData) {
  try {
      const result = await jobPostingModel.findOneAndUpdate(
          {jobPostingId:jobPostId},
          updateData,
          { new: true, runValidators: true }
      );

      if (!result) {
          throw new Error(Messages.EntityNotAvailable);
      }

      return result;
  } catch (error) {
      console.error(error);
      await logServices.Insert({ data: { jobPostId, updateData }, stack: error.stack }, error);
      throw new Error(Messages.UnableToUpdateEntity);
  }
};



exports.deleteJobPost = async function (jobPostId) {
  try {
      const result = await jobPostingModel.findOneAndUpdate(
          {jobPostingId:jobPostId},
          {isDeleted:1},
          { new: true, runValidators: true }
      );

      if (!result) {
          throw new Error(Messages.EntityNotAvailable);
      }

      return result;
  } catch (error) {
      console.error(error);
      await logServices.Insert({ data: { jobPostId, updateData }, stack: error.stack }, error);
      throw new Error(Messages.UnableToDeleteEntity);
  }
};
