const logModel=require('../schemas/logModel')

const Messages=require('../utils/messages')

exports.saveJobPost=async function(data){
    try{
        
      const newJobPost=new this(data)
          
      const result=await newJobPost.save()
  
      return result;
  
    }
    catch(error)
    {
      console.log(error);
      await logModel.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToSaveEntity);
    }


  }


exports.getAllJobPostings=async function(){
  try{
      
  
        
    const result=await this.find()

    return result;

  }
  catch(error)
  {
    console.log(error);
    await logModel.Insert({ data, stack: error.stack }, error);
    throw new Error(Messages.UnableToGetEntity);
  }


}

exports.getJobPostById=async function(where_cls){
  try{
      
    
        
    const result=await this.findOne(where_cls)

    return result;

  }
  catch(error)
  {
    console.log(error);
    await logModel.Insert({ data, stack: error.stack }, error);
    throw new Error(Messages.UnableToGetEntityById);
  }


}



exports.updateJobPost = async function (jobPostId, updateData) {
  try {
      const result = await this.findOneAndUpdate(
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
      await logModel.Insert({ data: { jobPostId, updateData }, stack: error.stack }, error);
      throw new Error(Messages.UnableToUpdateEntity);
  }
};



exports.deleteJobPost = async function (jobPostId) {
  try {
      const result = await this.findOneAndUpdate(
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
      await logModel.Insert({ data: { jobPostId, updateData }, stack: error.stack }, error);
      throw new Error(Messages.UnableToDeleteEntity);
  }
};
