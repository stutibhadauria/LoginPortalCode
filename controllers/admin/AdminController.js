const CourseModel = require("../../models/course")
const adminModel = require("../../models/admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dnroacutk',
    api_key: '956193383899983',
    api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
    // secure: true
});

//   });
class AdminController {
    static dashboard = async (req, res) => {
        try {
            const { name, image, _id } = req.admin
            const btech = await CourseModel.findOne({ user_id: _id, course: "B.TECH" })
            const bba = await CourseModel.findOne({ user_id: _id, course: "BBA" })
            const bca = await CourseModel.findOne({ user_id: _id, course: "BCA" })
            res.render('admin/dashboard', { n: name, i: image, bt: btech, bb: bba, bc: bca })
        }
        catch (err) {
            console.log(err)
        }
    }
    static bca = async (req, res) => {
        try {
            const { name } = req.admin
            res.render('admin/bca/bcadisplay', { n: name })
        } catch (err) {
            console.log(err)
        }
    }
    static bba = async (req, res) => {
        try {
            const { name } = req.admin
            res.render('admin/bba/formdisplay', { n: name })
        } catch (err) {
            console.log(err)
        }
    }
    static btech = async (req, res) => {
        try {
            const { name, email } = req.admin
            res.render('admin/btech/btechdisplay', { n: name })
        } catch (err) {
            console.log(err)
        }
    }
    static contact = async (req, res) => {
        try {
            const { name, image, email } = req.admin
            res.render('admin/contact', { n: name, i: image, e: email })
        } catch (err) {
            console.log(err)
        }
    }
    static about = async (req, res) => {
        try {
            const { name, image, email } = req.admin
            res.render('admin/about', { n: name, i: image, e: email })
        } catch (err) {
            console.log(err)
        }
    }
    static profile = async (req, res) => {
        try {
            const { name, image, email ,_id} = req.admin
            res.render('admin/profile', { n: name, i: image, e: email, message: req.flash("success"), message1: req.flash("error") })
        } catch (err) {
            console.log(err)
        }
    }
    static changepassword = async (req, res) => {
        try {
            const { name, image, _id } = req.admin
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await adminModel.findById(_id)
                const ismatch = await bcrypt.compare(oldpassword, user.password)
                if (!ismatch) {
                    req.flash("error", "old password is not match!!")
                    res.redirect('/profile')
                }
                else {
                    if (newpassword != cpassword) {
                        req.flash('error', "password and confirm password does not match")
                        res.redirect('/profile')
                    }
                    else {
                        const newHashpassword = await bcrypt.hash(newpassword, 10)
                        await adminModel.findByIdAndUpdate(_id, {
                            $set: { password: newHashpassword },
                        });
                        // alert("successfully change password!!")
                        req.flash("success", "password changes successfully!!")
                        res.redirect('/admin/dashboard')
                    }
                }
            } else {
                req.flash('error', "all fields are required")
                res.redirect('/')
            }
            // console.log(req.body)
        } catch (err) {
            console.log(err)
        }
    }
    static updateprofile = async (req, res) => {
        try {
            // console.log(req.files.image)
            // console.log(admin.id);
            if (req.files) {
                const user = await adminModel.findById(req.admin.id);
                const image_id = user.image.public_id;
            //  console.log(req.admin.id);
            // console.log(req.admin.image_id);
                await cloudinary.uploader.destroy(image_id);
                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "logo_image",
                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,

                }
            }
            const updateprofile = await adminModel.findByIdAndUpdate(req.admin.id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = AdminController