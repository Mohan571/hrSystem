
const common=require('../helpers/common')

const logModel=require('../schemas/logModel')

exports.Insert = async function (input, error) {
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

        const newRecord = new logModel(data);
        // console.log("New Record instance created:", newRecord);

        const savedRecord = await newRecord.save();
        // console.log("Record saved:", savedRecord);

        return savedRecord;
    } catch (error) {
        // console.error('Error inserting log record:', error.message);
        return false;
    }
};