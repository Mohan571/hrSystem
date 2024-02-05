const mongoose = require('mongoose');
const logModel=require('./logModel')
const Messages=require('../utils/messages')

const hrServices=require('../services/hrServices')
const hrSchema = new mongoose.Schema({
  HrId:{
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
    unique:true
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
  timestamps: true, // Adds createdAt and updatedAt automatically
});





hrSchema.statics.saveHr=hrServices.saveHr

hrSchema.statics.existUser=hrServices.existUser



hrSchema.statics.getProfile=hrServices.getProfile



const HR = mongoose.model('HR', hrSchema);

module.exports = HR;
