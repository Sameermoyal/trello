const userModel =require("../model/userModel")
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const secret_key=process.env.secret_key
const taskModel=require('../model/taskModel')
const listModel=require('../model/listModel')
const nodemailer=require('nodemailer')

exports.userSignUP=async(req,res)=>{
    try{
      const{email,password,userName,referralIdCode}=req.body;
     
    if(!userName || !email,!password){
      res.status(400).json({message:"all fields name,email ,password required"})
    }
      if(!referralIdCode){
        senderId=null
      }

      if(referralIdCode){
      const sender=  await userModel.findOne({referalCode:referralIdCode})
    
        if(sender){
          senderId=sender._id;
          console.log("sender Id",senderId)
        }else{
        senderId=null
        }
           }
      
      const spliceName=userName.slice(0,2)
      const randomNum=Math.floor(Math.random() *90)+10;
      const  referalCode=spliceName+randomNum;
     const salt=bcrypt.genSaltSync(10)
     const hashPassword=await bcrypt.hashSync(password,salt)
    
     const trialDays=5;
     const trialStartDate=new Date();
     const trialEndDate=new Date();
      trialEndDate.setDate(trialStartDate.getDate()+trialDays)

    const user=  await new userModel({userName,email,password:hashPassword,referalCode, 
      trial_start_date: trialStartDate,
        trial_end_date: trialEndDate,
        is_premium: false,
        referralId:senderId,

    }).save()
  
    res.status(200).json({message:"successfully signup",user})
  
    }catch(error){
      res.status(500).json({message:"internal server error",error:error.message})
    }    
  }

  

exports.userLogin=async(req,res)=>{
    try{
      const{email,password,referralIdCode}=req.body;
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

   if(!referralIdCode){
    senderId=null
  }

  if(referralIdCode){
  const sender=  await userModel.findOne({referalCode:referralIdCode})

    if(sender){
      senderId=sender._id;
      console.log("sender Id",senderId)
    }else{
    senderId=null
    }
   
    user.referralId=senderId
    user.save()

       }
  
    
    const token =jwt.sign({id:user._id},secret_key,{expiresIn:'1h'})
    return res.status(200).json({message:"successfully signup",token})
  
    }catch(error){
      res.status(500).json({message:"internal server error",error:error.message})
    }    
  }




  exports.getOneDetails=async(req,res)=>{
    try{
     const userId= req.user.id
     console.log("userId >>>>",userId)
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
    const trialEndDate=user.trial_end_date
    const endDate =new Date(trialEndDate);
    const now=new Date();
    const differnce=endDate-now;
    
    if(differnce<=0)return "Trial Expired";
    const days=Math.floor(differnce/(1000*60*60*24))
    console.log("days>>>>> ",days)
    console.log("userName     :   ",user.userName)
    
   res.status(200).json({message:" getOne route",listPopulate,email:user.email,name:user.userName,remainingDays : days, is_premium:user.is_premium} )
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

exports.addTask=async(req,res)=>{
  try{
    const{addAnotherTask,_id}=req.body;
    if (!addAnotherTask || !_id) {
      return res.status(400).json({ message: "Task and list ID are required" });
    }
    const list=await listModel.findById(_id);
    console.log(addAnotherTask)

    if (!list) {
      return res.status(400).json({ message: "List not found" });
    }
    list.descriptionList.push(addAnotherTask);
    list.save();
     console.log(">>>>>>",list)
  res.status(200).json({message:"successfully add task in list",list:list.descriptionList})
  }catch(error){
    res.status(500).json({message:"error to post add task"})
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

const fileUpload =require('express-fileupload')
const cloudinary =require('cloudinary')
const express=require('express')
const app=express()
cloudinary.config({
  cloud_name: 'dqfhn7rw3',
  api_key: '382695276612379', 
  api_secret:'3XWIpGNiRSe2K2Cs2t9-fUtPPY0', 
});

app.use(fileUpload({
  useTempFiles: true, // Enable temporary file storage
  tempFileDir: '/tmp/' // Set temporary file storage directory
}));
exports.uploadFile=async(req,res)=>{
  try{
    const id=req.user.id
     const { listItem ,descItem} = req.body; 
     const parsedListItem = JSON.parse(listItem); 
       console.log("descItem>>>>>uploadFile",descItem)
      if(!req.files || !req.files.image){
          return res.status(400).json({message:"'image is not uploaded '"})
      }
      const file=req.files.image;
      const result =await cloudinary.uploader.upload(file.tempFilePath)
      const list = await listModel.findById(parsedListItem._id);
      console.log("descItem",typeof(parseInt(descItem)))
      list.files.push({
        url: result.secure_url,
        name: file.name,
        imgPosition:parseInt(descItem)
      });
      await list.save();
      return res.status(200).json({message:"'file upload successfully '",imageurl:result.secure_url})

  }catch(error){
      return res.status(500).json({message:"'server error to upload image in list '",error:error.message})
  }
}

exports.uploadTemplateFile=async(req,res)=>{
  try{
    const _id=req.user.id;
    
    const {image}=req.files;
    if(!image){
      return res.status(400).json({message:"'image is not uploaded '",})
    }
      const file=req.files.image;
      console.log("Temporary file path:", file.tempFilePath);
       const result =await cloudinary.uploader.upload(file.tempFilePath)
       const user = await userModel.findById(_id);
      console.log("user",user)
      
    console.log("after result")
       
          await userModel.findByIdAndUpdate(_id,{template:result.secure_url});
          console.log("update template >>")
        
    console.log("url",result.secure_url)
    console.log("successuly work template uploader");
    return res.status(200).json({message:"'file upload successfully '",url:result.secure_url})
  }catch(error){
    return res.status(500).json({message:"'server error to uplaod template '",error:error.message})
  }
}


 exports.getTemplateFile=async(req,res)=>{
   try{ 
    const id=req.user.id
  
 console.log("called get api")
   const user= await  userModel.findOne({_id:id})

  console.log(" user >>>",user)
  res.status(200).json({message:"template set successfully",template:user.template,
   })
}catch(error){
   res.status(500).json({message:"bad request",error:error.message});
}
}


exports.reminderDeadline=async(req,res)=>{
  try{
   const userId= req.user.id
   const {starDate,endDate,endTime,reminder,listId,descItem}= req.body 
  //   const userPopulate=await taskModel.find().populate('userId');

 
  if(!endDate || !starDate || ! endTime || ! reminder){
    return res.status(401).json({message:"all fields are required"})
  }
  const combinedDateTime = `${endDate}T${endTime}:00`; 
  const endTimeDate=new Date(combinedDateTime)
  const _id=listId
  const list=await listModel.findById(_id)
 
  console.log("list.deadline >>",list)
  console.log("listId",listId,"descItem",descItem," reminder ",reminder," starDate ",starDate," endDate ",endDate," endTime ",endTime)

 list.deadline.push( { startDate : new Date(starDate) ,endDate:new Date(endDate), reminder:reminder, endTime:endTimeDate, index:descItem})
 
 await list.save();
  
  console.log("listItem",list)
 res.status(200).json({message:" reminder successfully save ",})
  }catch(error){
      res.status(500).json({message:"error to deadline",error:error.message})
  }
}




exports.addMember=async(req,res)=>{

 try{
  const _id=req.user.id;
 
  const{addEmail}=req.body;
 
  console.log(">>>>>>>>>>",addEmail)
  if(!addEmail){
   return res.status(400).json({message:"join member email not find"});
  }
  const sender=await userModel.findById(_id)
  const senderEmail=sender.email;
  const code=sender.referalCode;
 
  if(!senderEmail){
    return res.status(400).json({message:"admin email not find"});
   }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail, 
      pass: 'lfis oxee ftdf cout', 
    },
  });

  const mailOptions = {
    from: senderEmail, 
    to: addEmail, 
    subject: 'To Join Trello', 
    text: 'This is a mail regarding to join Trello.', 
     html: `<p>This is a mail regarding to join Trello.</p></br><b>Join This Code ${code} </b>
        <a href="http://localhost:5173/signup">join</a>
     `, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.status(200).json({message:"email send to new user"})
 }catch(error){
  res.status(500).json({message:"error to join new member",error:error.message})
 }

}
exports.getMember=async(req,res)=>{

 try{
  const _id=req.user.id;
  const user =await userModel.findById(_id);
   const name=user.userName
   const newMembers=await userModel.find({referralId: user._id})
   
 const memberName=  newMembers.map(i=>i.userName)


  
  res.status(200).json({message:"getMember call",memberName,adminName:name})
 }catch(error){
  res.status(500).json({message:"error to get new member",error:error.message})
 }

}













// exports.uploadFile = async (req, res) => {
//   try {
//     const id = req.user.id; // Assuming you are fetching user id from authentication middleware
//     console.log("User ID:", id);

//     const { listItem } = req.body; // Access the listItem from the request body
//     const parsedListItem = JSON.parse(listItem); // Parse it back into an object

//     console.log("Parsed ListItem:", parsedListItem);
//     console.log("Files:", req.files);

//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ message: "Image is not uploaded." });
//     }

//     const file = req.files.image;

//     // Upload the file to Cloudinary
//     const result = await cloudinary.uploader.upload(file.tempFilePath);
//     console.log("Uploaded file URL:", result.secure_url);

//     // Find the list item by its ID or any other unique identifier
//     const list = await listModel.findById(parsedListItem._id);

//     if (!list) {
//       return res.status(404).json({ message: "List not found." });
//     }

//     // Update the files array with the new image URL
//     list.files.push({
//       url: result.secure_url,
//       name: file.name
//     });

//     // Save the updated list
//     await list.save();

//     return res.status(200).json({
//       message: "File uploaded successfully.",
//       imageurl: result.secure_url
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error.", error: error.message });
//   }
// };
