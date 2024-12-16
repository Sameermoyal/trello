const mongoose=require('mongoose')

const userSchema =mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
 })

module.exports=mongoose.model('user',userSchema)
