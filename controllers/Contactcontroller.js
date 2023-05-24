const contactModel=require('../models/contact')

class ContactController{
    static display =async(req,res)=>{
        const data=await contactModel.find()
        res.render('collage/contact',{f:data})
    }
    static contactinsert=async(req,res)=>{
        try{
             const result=new contactModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
             })
              await result.save()
              res.redirect('/admin/contact')
        }
        catch(err){
            console.log(err)
        }
    }
    static contactview=async(req,res)=>{
        try{
             const result=await contactModel.find()
             res.render('collage/contact/contact',{f:result})
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports=ContactController