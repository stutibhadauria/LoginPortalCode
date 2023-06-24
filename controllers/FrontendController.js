const adminModel=require("../models/admin")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cloudinary=require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dnroacutk', 
    api_key: '956193383899983', 
    api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
    // secure: true
  });
class FrontendController{
    static welcome=async(req,res)=>{
        res.render('welcome')
    }
    static login=async(req,res)=>{
        res.render('login',{message:req.flash("success"),message1:req.flash("error")})
    }
    static adminregister=async(req,res)=>{
        res.render('register',{message:req.flash('error')})
    }
    static admininsert=async(req,res)=>{
        const file=req.files.image
       const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
        folder:'logo_image'
       })
        try{
             const{name,email,password,cpassword}=req.body
             const admin=await adminModel.findOne({email:email})
             if(admin){
                req.flash('error','email already exist!!')
                res.redirect('/register')
             }
             else{
                if(name && email && password && cpassword){
                    if(password==cpassword){
                        try{
                            const hashpassword=await bcrypt.hash(password,10)
                            const result=new adminModel({
                                name:name,
                                email:email,
                                password:hashpassword,
                                image: {
                                    public_id: myimage.public_id,
                                    url: myimage.secure_url                     
                                }
                            })
                            await result.save()
                            req.flash("success","registration succesfully ,please login")
                            res.redirect('/login')
                        }catch(err){
                            console.log(err)
                        }
                    }else{
                        req.flash('error','password and confirm password does not match please check it !!')
                        res.redirect('/register')
                    }
                }else{
                    req.flash('error','all field are required')
                    res.redirect('/register')
                }
             }
        }catch(err){
            console.log(err)
        }
    }
    static verifylogin=async(req,res)=>{
        // console.log(req.body)
        // const{email,password}=req.body
        // const admin=await adminModel.findOne({ email:email })
        // console.log(admin)
        try{
            const{email,password}=req.body
            if(email && password){
                const admin=await adminModel.findOne({
                    email:email
                })
                // console.log(admin)
                if(admin!=null){
                    const ismatched=await bcrypt.compare(password,admin.password)
                    if(ismatched){
                        if(admin.role=="user"){
                            const token=jwt.sign({id:admin._id},'stuti_bhadauria')
                            res.cookie('token',token)
                            res.redirect('/admin/dashboard')
                        }
                        if(admin.role=="admin"){
                            const token=jwt.sign({id:admin._id},'stuti_bhadauria')
                            res.cookie('token',token)
                            res.redirect('/collage/dashboard')
                        }
                    }else{
                        req.flash('error','email and password are not same,please login again')
                        res.redirect('/')
                    }
                }else{
                    req.flash('error','you are not registered user !')
                    res.redirect('/')
                }
            }else{
                req.flash('error','all fields are required')
                res.redirect('/')
            }
        }catch(err){
            console.log(err)
        }
    }
    static logout=async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }
        catch(err){
            console.log(err)
        }
    }
    
    
}

module.exports=FrontendController