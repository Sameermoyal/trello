const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        default:""
    },
    taskColor:{
        type:String,
        required:false,
    },
 })

 module.exports=mongoose.model('task',taskSchema)