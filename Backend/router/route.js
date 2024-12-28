const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const auth=require('../middleware/authentication')
const chechTrialStatus=require('../middleware/checkTrialStatus')

router.post('/signup',userController.userSignUP)
router.post('/login',userController.userLogin)
router.get('/getOne',auth,chechTrialStatus,userController.getOneDetails)
// router.get('/getAll',auth,userController.getDetails)
router.post('/create',auth,userController.create)
router.post('/addTaskList',auth,userController.addTask)
router.patch('/dndAdd',auth,userController.dragAndDrop)
router.patch('/updateColorList',auth,userController.updateColorList)
router.patch('/updateColorTask',auth,userController.updateColorTask)
router.patch('/resetPassword',auth,userController.resetOldPassword)
router.delete('/deleteTask/:taskId',auth,userController.deleteTask)
router.patch('/uploadFile',auth,userController.uploadFile)
router.patch('/userTemplate',auth,userController.uploadTemplateFile)
router.patch('/deadline',auth,userController.reminderDeadline)

router.get('/getTemplateImage',auth,userController.getTemplateFile)

module.exports =router;

