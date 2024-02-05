const logModel=require('../schemas/logModel')
const Messages=require('../utils/messages')

const employerModel=require('../schemas/employerModel')

const logServices=require('./logServices')

exports.saveEmployer=async function(data){
    try{
        
      const newEmployer=new employerModel(data)
          
      const result=await newEmployer.save()
  
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
      const result=await employerModel.findOne({username:username})  
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
      const result=await employerModel.findOne(where_cls)  
      
      return result;
      
    }
    catch(error)
    {
      console.log(error);
      await logServices.Insert({ where_cls, stack: error.stack }, error);
      throw new Error(Messages.UnableToGetEntity);
    }
  }
  

