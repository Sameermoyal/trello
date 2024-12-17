const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const auth=require('../middleware/authentication')

router.post('/signup',userController.userSignUP)
router.post('/login',userController.userLogin)
router.get('/getOne',auth,userController.getOneDetails)
// router.get('/getAll',auth,userController.getDetails)
router.post('/create',auth,userController.create)
router.patch('/dndAdd',auth,userController.dragAndDrop)
router.patch('/updateColorList',auth,userController.updateColorList)
router.patch('/updateColorTask',auth,userController.updateColorTask)
router.delete('/deleteTask/:taskId',auth,userController.deleteTask)
module.exports =router;

