const logModel=require('../schemas/logModel')
const Messages=require('../utils/messages')

const candidateModel=require('../schemas/candidateModel')
const logServices=require('./logServices')

//remove the this and import the model and chage the code accordingly

exports.saveCandidate=async function(data){
    try{
        
      const newCandidate=new candidateModel(data)
          
      const result=await newCandidate.save()
  
      return result;
  
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToSaveEntity);
    }
  }
  
  exports.existUser=async function(email){
    try{
      const result=await candidateModel.findOne({email:email})  
      if(result)
      {
        return true;
      }
      return false;
      
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }
  
  
  

exports.getAllCandidates=async function(){
  try{
      
  
        
    const result=await candidateModel.find()

    return result;

  }
  catch(error)
  {
    console.log(error);
    await logServices.Insert({ data, stack: error.stack }, error);
    throw new Error(Messages.UnableToGetEntity);
  }


}

exports.getCandidateById=async function(where_cls){
  try{
            
    const result=await candidateModel.findOne(where_cls)

    return result;

  }
  catch(error)
  {
    console.log(error);
    await logServices.Insert({ data, stack: error.stack }, error);
    throw new Error(Messages.UnableToGetEntityById);
  }


}



exports.updateCandidate = async function (candidateId, updateData) {
  try {
      const result = await candidateModel.findByIdAndUpdate(
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
      await logServices.Insert({ data: { jobPostId, updateData }, stack: error.stack }, error);
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
      await logServices.Insert({ data: { jobPostId, updateData }, stack: error.stack }, error);
      throw new Error(Messages.UnableToDeleteEntity);
  }
};

