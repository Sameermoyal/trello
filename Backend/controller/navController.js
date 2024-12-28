const navModel =require('../model/navModel')

const handleNavbar=async(req,res)=>{
   try{ const {navbarData}=req.body;
    const id=req.user.id
   console.log("Received navbar data:", navbarData);
   if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User is not authenticated' });
  }
  if (!navbarData || !Array.isArray(navbarData)) {
   return res.status(400).json({ message: 'Invalid navbar data' });
}
const user= await  navModel.findOne({userId:id})
console.log("user",user)
if(!user){
const updateNaveData= await new  navModel({ setNav:navbarData,userId :id}).save()
}else{
   const _id=user._id
   console.log("working update api")
  const updateNaveData=  await navModel.findByIdAndUpdate(_id,{setNav:navbarData})
}
  res.status(200).json({message:"navbar set successfully"})
}catch(error){
   res.status(500).json({message:"bad request",error:error.message});
}
}

const handleNavbarGet=async(req,res)=>{
   try{ 
    const id=req.user.id
  

   const navbarData= await  navModel.findOne({userId:id})

  console.log(" navbarData >>>", navbarData)
  res.status(200).json({message:"navbar set successfully",navItems:navbarData.setNav
   })
}catch(error){
   res.status(500).json({message:"bad request",error:error.message});
}
}




module.exports={handleNavbar,handleNavbarGet}