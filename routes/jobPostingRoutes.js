const express=require('express')

const router=express.Router()

const jobPostingControllers=require('../controllers/jobPostingControllers')

const common=require('../helpers/common')
const loginTypeMiddleware=require('../middlewares/loginTypeMiddleWare')
const Manager_Login_Type=process.env.Manager_Login_Type
const Hr_Login_Type=process.env.Hr_Login_Type



router.post('/saveJobPosting',common.validateToken,loginTypeMiddleware(Manager_Login_Type,Hr_Login_Type),jobPostingControllers.saveJobPosting)

router.get('/getAllJobPostings',common.validateToken,jobPostingControllers.getAllJobPostings)

router.get('/getJobPostById/:jobPostingId',common.validateToken,jobPostingControllers.getJobPostById)

router.post('/updateJobPost',common.validateToken,loginTypeMiddleware(Manager_Login_Type,Hr_Login_Type),jobPostingControllers.updateJobPost)

router.get('/deleteJobPost/:jobPostId',common.validateToken,loginTypeMiddleware(Manager_Login_Type,Hr_Login_Type),jobPostingControllers.deleteJobPost)






module.exports=router;
