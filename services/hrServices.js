const logModel=require('../schemas/logModel')

const Messages=require('../utils/messages')
const hrModel=require('../schemas/hrModel')

exports.saveHr=async function(data){
    try{
        
      const newHr=new hrModel(data)
          
      const result=await newHr.save()
  
      return result;
  
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToSaveEntity);
    }
  }
  
  exports.existUser=async function(username){
    try{
      const result=await hrModel.findOne({username:username})  
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
  
  
  
  exports.getProfile=async function(where_cls){
    try{
      const result=await hrModel.findOne(where_cls)  
      console.log(result)
      return result;
      
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ where_cls, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }
  