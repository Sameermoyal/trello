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
        default:'pink'
    },
   deadline:{
    type:[
        {
            startDate:{
               type:Date,
               required:false,
            },
            endDate:{
               type:Date,
               required:false,
               
            },
            reminder:{
               type:String,
               required:false,
            },
            endTime:{
               type:Date,
               required:false,
            },
            index:{
               type:Number,
               required:false
            }
       
          }
       ],
    required:false,
    default: []
}
   ,
  
    files:[
        {
            url:String,
            name:String,
            imgPosition:Number,
        }
    ]
   
 })

 module.exports=mongoose.model('list',listSchema)   