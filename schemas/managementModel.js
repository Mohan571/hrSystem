const mongoose = require('mongoose');

const logModel=require('./logModel')
const Messages=require('../utils/messages')
const managementServices=require('../services/managementServices')

const managementSchema = new mongoose.Schema({
  ManagerId:{
    type:String,
    required:true,
    unique:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  mobileNumber:{
    type:String,
    required:true,

  },
  alternateMobileNumber:{
    type:String
  },
  username: { 
    type: String,
    required: true 
  },
  password: {
     type: String, 
     required: true 
    },
  workEmail: {
     type: String, 
     required: true, 
     unique: true 
    },
    role:{
      type:String,
      required:true
    },
    profileImageUrl:{
      type:String
    },
    profileImageName:{
      type:String
    },
    moduleAccess:{
      type:String
    },
    status:{
      type:String
    },
    isDeleted:{
      type:Number
    }

},{
  timestamps: true, 
});


// managementSchema.statics.saveManagement=managementServices.saveManagement

// managementSchema.statics.existUser=managementServices.existUser

// managementSchema.statics.getProfile=managementServices.getProfile







const Management = mongoose.model('Management', managementSchema);

module.exports = Management;
