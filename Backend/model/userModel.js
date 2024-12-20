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
    trial_start_date:{
        type:String,
        required:false,
    },
    trial_end_date:{
        type:String,
        required:false,
    },
    is_premium:{
        type:Boolean,
        required:false,
    },
 })

module.exports=mongoose.model('user',userSchema)
