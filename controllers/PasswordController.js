const adminModel = require("../models/admin");

class PasswordController{
 static password=async(req,res)=>{
    try{
          res.render('password/password', {
            message: req.flash("success"),
            message1: req.flash("error"),
          });
    } catch(err){
        console.log(err)
    }
 }
  static verify=async(req,res)=>{
    try{
        const{email}=req.body;
         res.render('password/verify')
         console.log(email)
         const admin = await adminModel.findOne({ email: email });
      console.log(admin);
    } catch(err){
        console.log(err)
    }
  }
}
 module.exports=PasswordController 