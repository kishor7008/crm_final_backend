const express = require('express')
const router = express.Router()
const {userRegister, userLogin,employeeLeads,notInterested,singleLead,statusUpdate,workUpdate,myProfile,labelUpdate,reminderUpdate,logUpdate,codeSend
,varifyOtp,resetPassword} = require('../controllers/userController');
const {allocateLeads , reAllocateLeads,getLeads,getLeadsByEmployeeId,getSingleLeads,leadsStatus, updateStatus} = require('../controllers/leadsController');
const {adminIdgenereate}=require("../controllers/adminController")
const {protect}=require("../middleWare/auth")

// User
// user register 
router.post('/userRegister', userRegister);
//login user
router.post('/userLogin', userLogin);
//to see own profile details
router.get('/profile',protect, myProfile)
//employee show own all leada
router.get('/employee/leads/:status',protect, employeeLeads)
//employee see one particular lead
router.post('/singleLead',protect, singleLead)
//update status 
router.post('/status/update',protect, statusUpdate)
// update work status
router.post('/work/update',protect, workUpdate)
//employee update the lead as not interested
router.post('/notInterested',protect, notInterested)
// /employee update the leads
router.post('/labelUpdate',protect, labelUpdate)
// update reminder
router.post('/reminderUpdate',protect, reminderUpdate)
//update call logs
router.post('/logUpdate',protect, logUpdate)
// sending password forget otp
router.post('/sendcode', codeSend)
// varifying otp
router.post('/varify/otp', protect,varifyOtp)
// reset password
router.post('/reset/password', protect,resetPassword)


// ----------------------------------------------
//amdin
// /admin alocated leads to employee
router.post('/task', allocateLeads)
router.post('/reAllocate/:id', reAllocateLeads);
router.get('/getLeads', getLeads);
router.get('/getLeadsById',getLeadsByEmployeeId)
router.get('/getSingleLeads', getSingleLeads)
router.get('/:status', leadsStatus);
router.put('/updateStatus', updateStatus)
router.post("/eployeeId/generate",adminIdgenereate)


module.exports = router;