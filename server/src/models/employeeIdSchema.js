const mongoose = require("mongoose")

const employeeIdScheme = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        trim: true,
    }
})


const EmployeeId = mongoose.model("EmployeeId", employeeIdScheme)
module.exports = EmployeeId