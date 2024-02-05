const logModel=require('../schemas/logModel')

const Messages=require('../utils/messages')


exports.saveHr=async function(data){
    try{
        
      const newHr=new this(data)
          
      const result=await newHr.save()
  
      return result;
  
    }
    catch(error)
    {
      console.log(error);
      await logModel.Insert({ data, stack: error.stack }, error);
      throw new Error(Messages.UnableToSaveEntity);
    }
  }
  
  exports.existUser=async function(username){
    try{
      const result=await this.findOne({username:username})  
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
      console.log(result)
      return result;
      
    }
    catch(error)
    {
      console.log(error);
      await logModel.Insert({ where_cls, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }
  