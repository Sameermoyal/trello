const mongoose =require('mongoose');

const  navSchema=mongoose.Schema({
    setNav :{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

module.exports=mongoose.model('navmodel',navSchema);