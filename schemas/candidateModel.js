const mongoose = require("mongoose");

const candidateServices=require('../services/candidateServices')


const candidateSchema = new mongoose.Schema({
    candidateId:{
        type:String,
        unique:true,
        required:true
    },

    fullName: {
            type: String, 
            required: true
            },

    dob: {
            type: Date 
        },

    graduation: {
            type: String, 
        },
    postGraduation:{
            type: String 
        },

    mobileNumber: { type: String },

    email: { type: String },


    certifications: [{ type: String }],

    technicalSkills: {type:String},

    projects: [
    {
        name: { type: String },
        technologyUsed: { type: String },
        role: { type: String },
        responsibilities: { type:String },
        url:{type:String}
    }
    ],

    currentLocation: {
        type: String 
    },

    preferredLocation:{
        type: String
     },
    resume:{
        resumeName:{type:String},
        resumeUrl:{type:String}
    },
    CV:{
        CVName:{type:String},
        CVUrl:{type:String}
    },
    
    currentCTC: { type: String },
    expectedCTC: { type: String },
    noticePeriod: { type: String },
    
});





candidateSchema.statics.saveCandidate=candidateServices.saveCandidate
  
candidateSchema.statics.existUser=candidateServices.existUser  
  
candidateSchema.statics.getProfile=candidateServices.getProfile
  



const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports=Candidate