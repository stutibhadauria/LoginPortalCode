const jwt=require('jsonwebtoken')
const adminModel=require('../models/admin')
const admin_auth=async(req,res,next)=>{
    try{
       const{token}=req.cookies
       const verify_token=jwt.verify(token,'stuti_bhadauria')
       const admin_data=await adminModel.findOne({_id:verify_token.id})
       req.admin=admin_data
       next()
    }catch(err){
        res.redirect('/')
    }
}

module.exports=admin_auth