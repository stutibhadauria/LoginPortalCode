// const adminModel=require('../../models/admin')
// const cloudinary=require('cloudinary').v2
// cloudinary.config({ 
//     cloud_name: 'dnroacutk', 
//     api_key: '956193383899983', 
//     api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
//     // secure: true

const CourseModel = require("../../models/course")


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
            const { name } = req.admin
            res.render('admin/btech/btechdisplay', { n: name })
        } catch (err) {
            console.log(err)
        }
    }
    static contact = async (req, res) => {
        try {
            const { name, image } = req.admin
            res.render('admin/contact', { n: name, i: image })
        } catch (err) {
            console.log(err)
        }
    }
    static cpassword = async (req, res) => {
        try {
            const { name, image } = req.admin;
            res.render("admin/cpassword", {
                message: req.flash("success"),
                message1: req.flash("error"),
                n: name,
                i: image,
            });
        } catch (err) {
            console.log(err);
        }
    };

    static updatepassword = async (req, res) => {
        try {
            console.log(req.body)
            const { oldPassword, newPassword, confirmPassword } = req.body;

            if (oldPassword && newPassword && confirmPassword) {
                const admin = await LoginModel.findById(req.admin.id).select(
                    "+password"
                );
                const isMatch = await bcrypt.compare(oldPassword, admin.password);
                //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
                if (!isMatch) {
                    req.flash("error", "old password is incorecct");
                    res.redirect("/admin/cpassword");
                } else {
                    if (newPassword !== confirmPassword) {
                        req.flash(
                            "error",
                            "password and confirm password doesnt match!"
                        );
                        res.redirect("/admin/cpassword");
                    } else {
                        const salt = await bcrypt.genSalt(10);
                        const newhashPassword = await bcrypt.hash(newPassword, salt);
                        //console.log(req.user)
                        await LoginModel.findByIdAndUpdate(req.admin.id, {
                            $set: { password: newhashPassword },
                        });
                        req.flash("success", "password change successfully");
                        res.redirect("/admin/cpassword");
                    }
                }
            } else {
                req.flash("error", "All field are required");
                res.redirect("/admin/cpassword");
            }
        } catch (err) {
            console.log(err);
        }
    };
}
module.exports = AdminController