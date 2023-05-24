const express=require('express');
const AdminController = require('../controllers/admin/AdminController');
const FormController = require('../controllers/admin/FormController');
const FrontendController=require('../controllers/FrontendController')
const BcaController=require('../controllers/admin/BcaController')
const router=express.Router();
const admin_auth=require('../middleware/auth');
const BtechController = require('../controllers/admin/BtechController');
const CollageController = require('../controllers/CollageController');
const ContactController = require('../controllers/Contactcontroller');





//================frontend controller==========
router.get('/',FrontendController.login)
router.get('/register',FrontendController.adminregister)
router.post('/adminregister',FrontendController.admininsert)
router.post('/verifylogin',FrontendController.verifylogin)
router.get('/logout',FrontendController.logout)



//==============admin controller=============
router.get('/admin/dashboard',admin_auth,AdminController.dashboard)
router.get('/admin/contact',admin_auth,AdminController.contact)
router.get('/admin/cpassword',admin_auth,AdminController.cpassword)
router.post('/updatepassword',admin_auth,AdminController.updatepassword)

// formController
router.get('/admin/formdisplay',admin_auth,FormController.formdisplay)
router.post('/forminsert',admin_auth,FormController.forminsert)
router.get('/admin/formview',admin_auth,FormController.formview)
router.get('/admin/formedit/:id',admin_auth,FormController.formedit)
router.post('/formupdate/:id',admin_auth,FormController.formupdate)

//bcaController
router.get('/admin/bcadisplay',admin_auth,BcaController.bcadisplay)
router.post('/bcainsert',admin_auth,BcaController.bcainsert)
router.get('/admin/bcaview',admin_auth,BcaController.bcaview)
router.get('/admin/bcaedit/:id',admin_auth,BcaController.bcaedit)
router.post('/bcaupdate/:id',admin_auth,BcaController.bcaupdate)

//btechcontroller
router.get('/admin/btechdisplay',admin_auth,BtechController.btechdisplay)
router.post('/btechinsert',admin_auth,BtechController.btechinsert)
router.get('/admin/btechview',admin_auth,BtechController.btechview)
router.get('/admin/btechedit/:id',admin_auth,BtechController.btechedit)
router.post('/btechupdate/:id',admin_auth,BtechController.btechupdate)

//collagecontroller
router.get('/collage/dashboard',admin_auth,CollageController.dashboarddata)
router.get('/collage/display',admin_auth,CollageController.displaydata)
router.get('/collage/contact',admin_auth,CollageController.contact)

//contactcontroller
router.get('/collage/contact',admin_auth,ContactController.contactview)
router.post('/contactinsert',admin_auth,ContactController.contactinsert)

module.exports=router