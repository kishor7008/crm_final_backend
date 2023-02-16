const admin = require('../models/adminSchema');
const EmployeeId=require("../models/employeeIdSchema")
const adminRegister = async (req, res) => {
    const adminInfo = req.body
    const { name, email, mobile, password } = adminInfo
    const savedAdminInfo = await admin.create(adminInfo)
    res.status(200).send({ status: true, savedAdminInfo })
};

const adminLogin = async (req, res) => {
    const isRegisterAdmin = await admin.findOne({ email: req.body.email })
    res.status(200).send({ status: true, Message: "logged in successfully" })

}

function isNumberstring(str) {
    if (typeof str != "string") return false // we only process strings!
  if(typeof str == "string"){
      if((str.match( /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/))){
          return true
      }
      else{
          return false
      }
  }
  return false
  }

const adminIdgenereate = async (req, res) => {
    try{
        let employeeId=req.body.employeeId
        if (!isNumberstring( employeeId)) { return res.status(400).send({ status: false, msg: "Enter valid employer Id it may consists number or string." }) }
        
        const uniqueemplyerId = await EmployeeId.findOne({employeeId: employeeId })
        if ( uniqueemplyerId) {
            return res.status(400).send({ status: false, msg: "This emplpyer Id is already Present " })
        }
        const savedEmplyerId = await EmployeeId.create({employeeId:employeeId})
        res.status(200).send({ status: true,savedEmplyerId})


    }
 catch (err) { return res.status(500).send({ status: false, msg: err.massage }) }
}

module.exports = { adminRegister, adminLogin ,adminIdgenereate}