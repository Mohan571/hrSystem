
// const logModel=require('../schemas/logModel')
const logServices=require('./logServices')
const Messages=require('../utils/messages')
const managementModel=require('../schemas/managementModel')

exports.saveManagement=async function(data){
    try{
        
      const newManagement=new managementModel(data)
          
      const result=await newManagement.save()
  
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
      const result=await managementModel.findOne({username:username})  
      if(result)
      {
        return true;
      }
      return false;
      
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ username, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }
  
  
  exports.getProfile=async function(where_cls){
    try{
      const result=await managementModel.findOne(where_cls)  
      
      return result;
      
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ where_cls, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }