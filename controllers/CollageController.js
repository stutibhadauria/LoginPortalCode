const contactModel = require('../models/contact')
const CourseModel = require('../models/course')
const nodemailer=require('nodemailer')

class CollageController {
    static dashboarddata = async (req, res) => {
        try {
            const { name, image } = req.admin
            const data = await CourseModel.find()
            res.render('collage/dashboard', { n: name, i: image, f: data })
        } catch (err) {
            console.log(err)
        }
    }
    static displaydata = async (req, res) => {
        try {
            const { name, image } = req.admin
            const data = await CourseModel.find()
            res.render('collage/display', { n: name, i: image, f: data })
        } catch (err) {
            console.log(err)
        }
    }
    static contact = async (req, res) => {
        try {
            const { name, image } = req.admin
            const data = await contactModel.find()
            res.render('collage/contact', { n: name, i: image, f: data })
        } catch (err) {
            console.log(err)
        }
    }
    static SendEmail = async ( course, name, email) => {
        console.log( course, name, email)
        console.log(email)
        // 1RHfz85p4XfEue4Juv
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'stutibhadauria28@gmail.com',
                pass: 'moawpjgxlndmurhx'
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"stutibhadauria28@gmail.com" <stutibhadauria28@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `${ name } your ${ course } course  successfully, <br><b></b>`, // html body
        });
    }
    static updateapproval=async(req,res)=>{
        try{
            const data=await CourseModel.findByIdAndUpdate(req.params.id,{
             Comment:req.body.Comment,
             status:req.body.status
            });
            res.redirect('/collage/dashboard')
        }catch(err){
            console.log(err);
        }
    }
}
module.exports=CollageController