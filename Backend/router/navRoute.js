const express =require('express');
const {handleNavbar ,handleNavbarGet}=require('../controller/navController')
const router=express.Router()
const auth=require('../middleware/authentication')

router.patch('/navbarUpdate',auth,handleNavbar)
router.get('/navbarGet',auth,handleNavbarGet)

module.exports =router;