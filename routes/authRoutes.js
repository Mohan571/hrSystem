const express=require('express')

const router=express.Router()

const authControlers=require('../controllers/authControlers')




router.post('/managementLogin',authControlers.managementLogin)

router.post('/hrLogin',authControlers.hrLogin)


router.post('/employerLogin',authControlers.employerLogin)


module.exports=router

