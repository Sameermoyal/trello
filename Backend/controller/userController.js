const userModel =require("../model/userModel")
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const secret_key=process.env.secret_key
const taskModel=require('../model/taskModel')
const listModel=require('../model/listModel')

exports.userSignUP=async(req,res)=>{
    try{
      const{email,password}=req.body;
     const salt=bcrypt.genSaltSync(10)
     const hashPassword=await bcrypt.hashSync(password,salt)
  
    const user=  await new userModel({email,password:hashPassword}).save()
  
    res.status(200).json({message:"successfully signup",user})
  
    }catch(error){
      res.status(500).json({message:"internal server error",error:error.message})
    }    
  }

exports.userLogin=async(req,res)=>{
    try{
      const{email,password}=req.body;
      const user =await userModel.findOne({email})
      if(!user){
        return  res.status(400).json({message:"user not register"})
      }
      console.log('>user>>>>',user)
      const dbPassword=user.password
     const match=await bcrypt.compare(password,dbPassword)
       
    if(!match){
    return  res.status(400).json({message:"password invalid"})
   }
    const token =jwt.sign({id:user._id},secret_key,{expiresIn:'1h'})
    return res.status(200).json({message:"successfully signup",token})
  
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
  exports.getOneDetails=async(req,res)=>{
    try{
     const userId= req.user.id
    const user=await userModel.findOne({_id:userId})
    const userTask=await taskModel.find({userId:user._id})
    const taskIds=userTask.map(i=>i._id)
  
    const listPopulate = await listModel
    .find({ taskId: { $in: taskIds } }) 
    .populate({
      path: "taskId",
      populate: {
        path: "userId",
        model: "user",
      },
    });
    
   res.status(200).json({message:" getOne route",listPopulate,email:user.email})
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
      console.log("title",title,"descriptionList",descriptionList)
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
     const existingDropList=await listModel.findOne({_id:dropIds.dropListId})
      if(!existingDropList){
         return res.status(400).json({message:"not present existing task"})
      }
      const existingDragList=await listModel.findOne({_id:dragIds.listId})
      const arrIndex=dragIds.descItem; 
     const preData=existingDropList.descriptionList
      const updateDropData=[...preData,existingDragList.descriptionList[arrIndex]] 
      const updateDropList=await listModel.findByIdAndUpdate(existingDropList._id,{descriptionList:updateDropData})
        //   { dropListId,dropTaskId} =dropIds ;
      //   { descItem,listId, taskId}=dragIds ;
      const preDragData=existingDragList.descriptionList
     
      const updatedDragData=[]
      for(let i=0;i<preDragData.length;i++){
          if(i != arrIndex){
              updatedDragData.push(preDragData[i])
          }
      }
      console.log("updatedDragData",updatedDragData)
      const updateDragList=await listModel.findByIdAndUpdate(existingDragList._id,{descriptionList:updatedDragData})
      // const listPopulate =await listModel.find().populate({ path:'taskId',
      //     populate:{
      //         path:'userId',
      //         model:'user'
      //     }
      // })
      const userId= req.user.id
      const user=await userModel.findOne({_id:userId})
      const userTask=await taskModel.find({userId:user._id})
      const taskIds=userTask.map(i=>i._id)
      const listPopulate = await listModel
      .find({ taskId: { $in: taskIds } }) 
      .populate({
        path: "taskId",
        populate: {
          path: "userId",
          model: "user",
        },
      });
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

exports.updateColorList=async(req,res)=>{
  try{
    const id=req.user.id
    const{color,task}=req.body
    console.log("Color >>>>: ",color,"task",task)
    getList=await listModel.find({taskId:task}),
    
    console.log("getList",getList)
    const _id=getList[0]._id;
  
    const updatedList = await listModel.findByIdAndUpdate( _id,{ listColor: color }, { new: true });
  console.log(">>>>>>>>>>>updatedList",updatedList)
 console.log(">>>>>>>>next")
 res.status(200).json({message:" color update successfully ",updatedList})
  }catch(error){
      res.status(500).json({message:"error to update color",error:error.message})
  }
}
exports.updateColorTask=async(req,res)=>{
  try{
    const id=req.user.id
    const{color,task}=req.body
    console.log("Color >>>>: ",color,"task",task)
    getList=await taskModel.find({_id:task}),
    
    console.log("getList",getList)
    const _id=getList[0]._id;
  
    const updatedTask = await taskModel.findByIdAndUpdate( _id,{ taskColor: color }, { new: true });
  console.log(">>>>>>>>>>>updatedList",updatedTask)
 console.log(">>>>>>>>next")
 res.status(200).json({message:" color update successfully ",updatedTask})
  }catch(error){
      res.status(500).json({message:"error to update color",error:error.message})
  }
}


exports.resetOldPassword=async(req,res)=>{
  try{
   const{oldPassword,newPassword,userEmail}=req.body
  
  console.log("oldPassword : ",oldPassword," newPassword : ",newPassword,"userEmail ",userEmail )
  if(!oldPassword  || !newPassword){
   return res.status(401).json({message:"both fields required"})
  }
 
  const user=await userModel.findOne({email:userEmail})
  if (!user) {
   return res.status(404).json({ message: "User not found" }); 
  }
  const dbPassword=user.password
  
  const match=await bcrypt.compare(oldPassword,dbPassword)
  
    if(!match){
      return res.status(400).json({message:"old password miss match, try again " })
    }
    const salt=await bcrypt.genSaltSync(10);
    const hashPassword=await bcrypt.hashSync(newPassword,salt)
     const _id=user._id
     console.log("reset seccessfully")
     console.log('id ',_id)
    const updatePass=await userModel.findByIdAndUpdate(_id,{password:hashPassword})
   
    return res.status(200).json({message:"reset password successfully"})
  }catch(error){
    return res.status(500).json({message:"error detect to resetPassword :" ,error:error.message})
  }
}