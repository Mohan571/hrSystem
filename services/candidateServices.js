const logModel=require('../schemas/logModel')
const Messages=require('../utils/messages')



exports.saveCandidate=async function(data){
    try{
        
      const newCandidate=new this(data)
          
      const result=await newCandidate.save()
  
      return result;
  
    }
    catch(error)
    {
      console.log(error);
      await logModel.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToSaveEntity);
    }
  }
  
  exports.existUser=async function(email){
    try{
      const result=await this.findOne({email:email})  
      if(result)
      {
        return true;
      }
      return false;
      
    }
    catch(error)
    {
      console.log(error);
      await logModel.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }
  
  
  

exports.getAllCandidates=async function(){
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

exports.getCandidateById=async function(where_cls){
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



exports.updateCandidate = async function (candidateId, updateData) {
  try {
      const result = await this.findByIdAndUpdate(
          candidateId,
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



exports.deleteCandidate = async function (candidateId) {
  try {
      const result = await this.findByIdAndUpdate(
          candidateId,
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

