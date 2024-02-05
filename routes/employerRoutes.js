const express=require('express')

const router=express.Router()

const common=require('../helpers/common')
const upload=require('../helpers/upload')
const managementController=require('../controllers/managementControllers')
const candidateController=require('../controllers/candidateController')
const employerControllers=require('../controllers/employerControllers')
const hrControllers=require('../controllers/hrControllers')

const loginTypeMiddleware=require('../middlewares/loginTypeMiddleWare')
const Manager_Login_Type=process.env.Manager_Login_Type
const Hr_Login_Type=process.env.Hr_Login_Type
const Employer_Login_Type=process.env.Employer_Login_Type


router.post('/createEmployerLogin',common.validateToken,upload.single('image'),loginTypeMiddleware(Manager_Login_Type),employerControllers.createEmployerLogin)


module.exports=router;