const contactModel = require('../models/contact')
const CourseModel=require('../models/course')

class CollageController{
    static dashboarddata=async(req,res)=>{
        try{
            const{name,image}=req.admin
            const data= await CourseModel.find()
            res.render('collage/dashboard',{n:name,i:image,f:data})
        }catch(err){
            console.log(err)
        }
    }
    static displaydata=async(req,res)=>{
        try{
            const{name,image}=req.admin
            const data= await CourseModel.find()
            res.render('collage/display',{n:name,i:image,f:data})
        }catch(err){
            console.log(err)
        }
    }
    static contact=async(req,res)=>{
        try{
            const{name,image}=req.admin
            const data= await contactModel.find()
            res.render('collage/contact',{n:name,i:image,f:data})
        }catch(err){
            console.log(err)
        }
    }
}
module.exports=CollageController