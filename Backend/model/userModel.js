const mongoose=require('mongoose')

const userSchema =mongoose.Schema({
 email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userColor:{
        type:String,
        required:false,
    },
 })

module.exports=mongoose.model('user',userSchema)
