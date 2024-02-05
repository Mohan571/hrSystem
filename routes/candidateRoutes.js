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




router.post('/saveCandidate',common.validateToken,loginTypeMiddleware(Hr_Login_Type,Manager_Login_Type),upload.fields([{ name: 'resume' }, { name: 'cv' }]),candidateController.saveCandidate)


router.get('/deleteCandidate/:candidateId',common.validateToken,loginTypeMiddleware(Hr_Login_Type,Manager_Login_Type),candidateController.deleteCandidate)

router.post('/updateCandidate/:candidateId',common.validateToken,loginTypeMiddleware(Hr_Login_Type,Manager_Login_Type),candidateController.updateCandidate)

router.get('/getAllCandidates',common.validateToken,candidateController.getAllCandidates)

router.get('/getCandidateById/:candidateId',common.validateToken,candidateController.getCandidateById)







module.exports=router;