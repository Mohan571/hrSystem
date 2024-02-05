const mongoose=require('mongoose')
const { datetime } = require('../helpers/common')
const common=require('../helpers/common')


const logSchema=new mongoose.Schema({
    created_at:{
        type:Date,
        required:true
    },
    input:{
        type:String,
        required:true
    },
    error:{
        type:String
    }
})

logSchema.statics.Insert = async function (input, error) {
    try {
        // console.log("I am in log model");

        let cr_datetime = await common.datetime();
        // console.log("I am after cr_time");
        console.log(cr_datetime);
        let data = {
            created_at: cr_datetime,
            input: JSON.stringify(input),
            error: error
        };
        // console.log("Data to be inserted:", data);

        const newRecord = new this(data);
        // console.log("New Record instance created:", newRecord);

        const savedRecord = await newRecord.save();
        // console.log("Record saved:", savedRecord);

        return savedRecord;
    } catch (error) {
        // console.error('Error inserting log record:', error.message);
        return false;
    }
};


const logModel=mongoose.model('logModel',logSchema)

module.exports=logModel