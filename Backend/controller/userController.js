const userModel =require("../model/userModel")
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const secret_key=process.env.secret_key
const taskModel=require('../model/taskModel')
const listModel=require('../model/listModel')

exports.userSignUP=async(req,res)=>{
    try{
      const{id,password}=req.body;
     const salt=bcrypt.genSaltSync(10)
     const hashPassword=await bcrypt.hashSync(password,salt)
  
    const user=  await new userModel({id,password:hashPassword}).save()
  
    res.status(200).json({message:"successfully signup",user})
  
    }catch(error){
      res.status(500).json({message:"internal server error",error:error.message})
    }    
  }

exports.userLogin=async(req,res)=>{
    try{
      const{id,password}=req.body;
      const user =await userModel.findOne({id})
      if(!user){
          res.status(400).json({message:"user not register"})
      }
      console.log('>user>>>>',user)
      const dbPassword=user.password
     const match=await bcrypt.compare(password,dbPassword)
       
    if(!match){
      res.status(400).json({message:"password invalid"})
   }
    const token =jwt.sign({id:user._id},secret_key,{expiresIn:'1h'})
     res.status(200).json({message:"successfully signup",token})
  
    }catch(error){
      res.status(500).json({message:"internal server error",error:error.message})
    }    
  }


  exports.getDetails=async(req,res)=>{
    try{
     const userId= req.user.id
      const listPopulate=await listModel.find().populate(
        {
          path: 'taskId', 
          populate: {
              path: 'userId', 
              model: 'user'  
          }
      }
      );
    //   const userPopulate=await taskModel.find().populate('userId');


   res.status(200).json({message:" get All",listPopulate})
    }catch(error){
        res.status(500).json({message:"error to getAll",error:error.message})
    }
}


exports.create=async(req,res)=>{
  try{
      const id=req.user.id
      console.log("id>>>>>",id)
      const user=await userModel.findOne({_id:id})
      
      const userId=user._id
      console.log(">>>>>>>user in create ",userId)
      const{title,descriptionList}=req.body
      if (!title || !Array.isArray(descriptionList)) {
          return res.status(400).json({ message: "Invalid request data" });
      }
      const task=await new taskModel({userId,title}).save()
      const list=await new listModel({descriptionList,taskId: task._id }).save()
      res.status(200).json({message:" create successfully ", task,
          list,})
  }catch(error){
        res.status(500).json({message:"error to create",error:error.message})
    }
}

exports.dragAndDrop=async(req,res)=>{
  try{
      const id=req.user.id
     const{dropIds,dragIds}= req.body
     console.log("dropIds : ",dropIds," dragIds : ",dragIds)
   
     const existingDropList=await listModel.findOne({_id:dropIds.dropListId})
      if(!existingDropList){
         return res.status(400).json({message:"not present existing task"})
      }
     
      const existingDragList=await listModel.findOne({_id:dragIds.listId})
      console.log("existingDragList>>>>>>",existingDragList)
      const arrIndex=dragIds.descItem; 
     const preData=existingDropList.descriptionList
      const updateDropData=[...preData,existingDragList.descriptionList[arrIndex]] 
      const updateDropList=await listModel.findByIdAndUpdate(existingDropList._id,{descriptionList:updateDropData})
        //   { dropListId,dropTaskId} =dropIds ;
      //   { descItem,listId, taskId}=dragIds ;
      const preDragData=existingDragList.descriptionList
      console.log("preDragData : ",preDragData)
      const updatedDragData=[]
      for(let i=0;i<preDragData.length;i++){
          if(i != arrIndex){
              updatedDragData.push(preDragData[i])
          }
      }
      console.log("updatedDragData",updatedDragData)
      const updateDragList=await listModel.findByIdAndUpdate(existingDragList._id,{descriptionList:updatedDragData})
      const listPopulate =await listModel.find().populate({ path:'taskId',
          populate:{
              path:'userId',
              model:'user'
          }
      })
      console.log("success>>>>>")
      res.status(200).json({message:" update successfully ",listPopulate})
    }catch(error){
        res.status(500).json({message:"error to create",error:error.message})
    }
}

exports.deleteTask=async(req,res)=>{
  try{
      const id=req.user.id
      const {taskId}=req.params
      console.log("req.params",req.params)
      const existingTask=await taskModel.findOne({_id:taskId})
      const updateTask=await taskModel.findByIdAndDelete(existingTask._id)
     
      const existingList=await listModel.findOne({taskId:existingTask._id})
      const updateList=await listModel.findByIdAndDelete(existingList._id)
       console.log("successfully delete : updateList ",updateList,"updateTask ",updateTask)

   res.status(200).json({message:" delete successfully ",updateList,updateTask})
    }catch(error){
        res.status(500).json({message:"error to create",error:error.message})
    }
}