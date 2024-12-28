const express =require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require('cors')
const router=require("./router/route")
const navRouter=require('./router/navRoute')
const fileUpload =require('express-fileupload')
const cloudinary =require('cloudinary')
const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
app.use('/',router)
app.use('/setting',navRouter)

const mongoURL=process.env.MONGODB_URL
mongoose.connect(mongoURL).then(()=>console.log("mongodb successfully connected")).catch((error)=>console.log("error to connect mongoDB" ,error))

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("server successfully running this port : ",PORT)
})