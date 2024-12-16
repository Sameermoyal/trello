const mongoose=require('mongoose')

const listSchema =mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'task',
        required:true
    },
    
    descriptionList:{
        type:Array,
        default:[]
    },

 })

 module.exports=mongoose.model('list',listSchema)