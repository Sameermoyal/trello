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
    listColor:{
        type:String,
        required:false,
    },
    deadline:{
        type:Date,
    },
    files:[
        {
            url:String,
            name:String
        }
    ]
   
 })

 module.exports=mongoose.model('list',listSchema)   