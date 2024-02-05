
const Joi=require('joi');
const common=require("../helpers/common")
const ApiResponse=require('../utils/ApiResponse')
const hrServices=require('../services/hrServices')
const employerServices=require('../services/employerServices')
const logServices=require('../services/logServices')
const managementServices=require('../services/managementServices')




exports.managementLogin=async (req,res)=>{
    try {
        const schema = Joi.object({
            user_name: Joi.string().trim().required(),
            password: Joi.string().trim().required(),
        }).unknown(true);

        const { error, value } = schema.validate(req.body);
        if (error) {
            return ApiResponse.validationsResponse(res,error)
        }
        const data = req.body;
        let user_data = data;
        let where_cls = {
            username: data.user_name,
        }
        // delete user_data['user_name'];
        let response = await managementServices.getProfile(where_cls)
        // console.log(response,'res')
        if (!response) {
            return ApiResponse.entityNotAvailable(res,"User not Exists please SignUp first")
        }
        
        let en_p = await common.passendep(data['password'], 'en');
        if (response['password'] !== en_p) {
            message = 'Password not matched,Please Enter correct Password';
            return ApiResponse.invalidCredentialResponse(res,message)
        }
        delete response['password'];
        let generate_token_data = {
            user_id: response['ManagerId'],
            user_name: response['username'],
            name: response['firstName']+response['lastName'],
            login_type: response['role']
        }
        let token = await common.generatejwttoken(generate_token_data, res);

       return ApiResponse.sendDataResponse(res,token,"successfully loggedin")

    } catch (error) {
        await logServices.Insert(req.body, error);
        // insert the log in the database table name log if anything worng in this api
        return ApiResponse.serverIssueResponse(res, error);
        // default response if any try catch error
    }
}






exports.hrLogin=async (req,res)=>{
    try {
        
        const schema = Joi.object({
            user_name: Joi.string().trim().required(),
            password: Joi.string().trim().required(),
        }).unknown(true);
        // console.log(req.body)
        const { error, value } = schema.validate(req.body);
        if (error) {
            return ApiResponse.validationsResponse(res,error)
        }
        console.log(req.body)
        const data = req.body;
        let user_data = data;
        let where_cls = {
            username: data.user_name,
        }
        // delete user_data['user_name'];
        let response = await hrServices.getProfile(where_cls)
        // console.log(response,'res')
        if (!response) {
            return ApiResponse.entityNotAvailable(res,"User not Exists please SignUp first")
        }
        
        let en_p = await common.passendep(data['password'], 'en');
        console.log(en_p)
        if (response['password'] !== en_p) {
            message = 'Password not matched,Please Enter correct Password';
            return ApiResponse.invalidCredentialResponse(res,message)
        }
        delete response['password'];
        let generate_token_data = {
            user_id: response['HrId'],
            user_name: response['username'],
            name: response['firstName']+response['lastName'],
            login_type: response['role']
        }
        let token = await common.generatejwttoken(generate_token_data, res);
        // console.log(token)
       return ApiResponse.sendDataResponse(res,token,"successfully loggedin")

    } catch (error) {
        console.log(error)
        await logServices.Insert(req.body, error);
        // insert the log in the database table name log if anything worng in this api
        return ApiResponse.serverIssueResponse(res, error);

    }
}




exports.employerLogin=async (req,res)=>{
    try {
        const schema = Joi.object({
            user_name: Joi.string().trim().required(),
            password: Joi.string().trim().required(),
        }).unknown(true);

        const { error, value } = schema.validate(req.body);
        if (error) {
            return ApiResponse.validationsResponse(res,error)
        }
        const data = req.body;
        let user_data = data;
        let where_cls = {
            username: data.user_name,
        }
        // delete user_data['user_name'];
        let response = await employerServices.getProfile(where_cls)
        // console.log(response,'res')
        if (!response) {
            return ApiResponse.entityNotAvailable(res,"User not Exists please SignUp first")
        }
        
        let en_p = await common.passendep(data['password'], 'en');
        if (response['password'] !== en_p) {
            message = 'Password not matched,Please Enter correct Password';
            return ApiResponse.invalidCredentialResponse(res,message)
        }
        delete response['password'];
        let generate_token_data = {
            user_id: response['employerId'],
            user_name: response['username'],
            name: response['firstName']+response['lastName'],
            login_type: response['role']
        }
        let token = await common.generatejwttoken(generate_token_data, res);

       return ApiResponse.sendDataResponse(res,token,"successfully loggedin")

    } catch (error) {
        await logServices.Insert(req.body, error);
        // insert the log in the database table name log if anything worng in this api
        return await common.error(res); // default response if any try catch error
    }
}
