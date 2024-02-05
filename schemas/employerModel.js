const mongoose = require('mongoose');
const logModel=require('./logModel')
const Messages=require('../utils/messages')
const employerServices=require('../services/employerServices')
const employerSchema = new mongoose.Schema({
  employerId:{
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
  timestamps: true, // Adds createdAt and updatedAt automatically
});




// employerSchema.statics.saveEmployer=employerServices.saveEmployer

// employerSchema.statics.existUser=employerServices.existUser


// employerSchema.statics.getProfile=employerServices.getProfile


const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
