
const CourseModel=require('../../models/course')
class BcaController{

    static bcadisplay = async(req,res)=>{
      const{name,image,email}=req.admin
        res.render('admin/bca/bcadisplay',{n:name,i:image,e:email})
    }
    static bcainsert = async(req,res)=>{
        try {
          const{_id}=req.admin
            const result = new CourseModel({
              name   :   req.body.name,
              email  :   req.body.email,
              phone  :   req.body.phone,
              gender :   req.body.gender,
              date    :   req.body.date,
              address:   req.body.address,
              college:   req.body.college,
              course:    req.body.course,
              branch :    req.body.branch,
              user_id:   _id
            });
            await result.save();
            //route url in redirect
            res.redirect("/admin/bcaview");
          } catch (err) {
            console.log(err);
          }
        };
    static bcaview = async(req,res)=>{
        try{
          const{name,image,_id}=req.admin
            const result = await CourseModel.find({user_id:_id})
            res.render('admin/bca/bcaview',{ f : result,n:name,i:image})
        }
        catch(err){
            console.log(err);
        }
    }
    static bcaedit=async(req,res)=>{
      try{
        const{name,image}=req.admin
         const result=await CourseModel.findById(req.params.id)
         res.render('admin/bca/bcaedit',{f:result,n:name,i:image})
      }catch(err){
        console.log(err)
      }
    }
    static bcaupdate=async(req,res)=>{
      try{
        const result=await CourseModel.findByIdAndUpdate(req.params.id,{
          name   :   req.body.name,
          email  :   req.body.email,
          phone  :   req.body.phone,
          gender :   req.body.gender,
          date    :   req.body.date,
          address:   req.body.address,
          college:   req.body.college,
          course:    req.body.course,
          branch :    req.body.branch,
        })
        await result.save()
        res.redirect('/admin/bcaview')
    }catch(err)
    {
        console.log(err)
    }
    }
}

module.exports=BcaController
