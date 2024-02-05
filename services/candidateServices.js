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
  
  
  
  exports.getProfile=async function(where_cls){
    try{
      const result=await this.findOne(where_cls)  
      
      return result;
      
    }
    catch(error)
    {
      console.log(error);
      await logModel.Insert({ where_cls, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }