const mongoose = require("mongoose");

const candidateServices=require('../services/candidateServices')


const candidateSchema = new mongoose.Schema({

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
        url:[{type:String}]
    }
    ],

    currentCity: {
        type: String 
    },
    currentState: {
        type: String 
    },
    currentCountry: {
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
    currency:{type:String},
    currentCTC: { type: String },
    expectedCTC: { type: String },
    noticePeriod: { type: String },
    isDeleted:{type:Number}
    
});





// candidateSchema.statics.saveCandidate=candidateServices.saveCandidate
  
// candidateSchema.statics.existUser=candidateServices.existUser  
  
// candidateSchema.statics.getProfile=candidateServices.getProfile

// candidateSchema.statics.getAllCandidates=candidateServices.getAllCandidates

// candidateSchema.statics.getCandidateById=candidateServices.getCandidateById

// candidateSchema.statics.deleteCandidate=candidateServices.deleteCandidate

// candidateSchema.statics.updateSchema=candidateServices.updateCandidate





const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports=Candidate