const mongoose = require('mongoose');
const logModel=require('./logModel')
const Messages=require('../utils/messages')

const jobPostingServices=require('../services/jobPostServices')

const jobPostingSchema = new mongoose.Schema({
    jobPostingId:{
      type:String,
      required:true,
      unique:true
    },
    jobDescription:{
      type:String,
      required:true
    },
    role:{
      type:String,
      required:true
    },
    location:{
      type:String,
    },
    experience: { 
      type: String,
      required: true 
    },
    noticePeriod:{
      type:String
    },
    createdBy: {
       type: String, 
       required: true 
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







jobPostingSchema.statics.saveJobPost=jobPostingServices.saveJobPost


jobPostingSchema.statics.getAllJobPostings=jobPostingServices.getAllJobPostings


jobPostingSchema.statics.getJobPostById=jobPostingServices.getJobPostById


jobPostingSchema.statics.updateJobPost =jobPostingServices.saveJobPost


jobPostingSchema.statics.deleteJobPost = jobPostingServices.deleteJobPost




const jobPostingModel=mongoose.model('jobPosting',jobPostingSchema)

module.exports=jobPostingModel