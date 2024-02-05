const express=require('express')

const router=express.Router()

const common=require('../helpers/common')
const upload=require('../helpers/upload')
const managementController=require('../controllers/managementControllers')
const candidateController=require('../controllers/candidateController')


const loginTypeMiddleware=require('../middlewares/loginTypeMiddleWare')
const Manager_Login_Type=process.env.Manager_Login_Type
const Hr_Login_Type=process.env.Hr_Login_Type
const Employer_Login_Type=process.env.Employer_Login_Type


router.post('/saveManagement',upload.single('image'),managementController.createManagementLogin)




router.post('/saveCandidate',common.validateToken,loginTypeMiddleware(Hr_Login_Type,Manager_Login_Type),upload.fields([{ name: 'resume' }, { name: 'cv' }]),candidateController.saveCandidate)


router.post('/createEmployerLogin',common.validateToken,upload.single('image'),loginTypeMiddleware(Manager_Login_Type),managementController.createEmployerLogin)


router.post('/createHrLogin',common.validateToken,upload.single('image'),loginTypeMiddleware(Manager_Login_Type),managementController.createHrLogin)










module.exports=router;