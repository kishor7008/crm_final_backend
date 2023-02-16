const Leads = require('../models/leadsModel');
const Users = require('../models/userModel')


const allocateLeads = async (req, res) => {
    let clientLeads = req.body.task
    let arr = []
    clientLeads.map((ele) => {
        let obj = {
            name: ele.name,
            email: ele.email.toLowerCase(),
            contact: ele.contact,
            message: ele.message
        }
        arr.push(obj)

    });
    let employies = await Users.find()
    let numberOfEmp = employies.length;
    let numberOfTask = arr.length;
    let splitedTask = Math.floor(numberOfTask / numberOfEmp)
    

  const leadSpread=async(start,end,element)=>{
  for(let i=start;i<end;i++){
    let leads=new Leads({
        employeeId:element.employeeId,
        assignTo:element.name,
        tasks:[arr[i]]
    })
    await leads.save()
  }
  }
let k=0;
let p=splitedTask
  for(let j=k;j<employies.length;j++){
    leadSpread(k,p,employies[j])
    k=p;
    p=p+splitedTask
  }



    let leadsData = await Leads.find().select({ employeeId: 1, assignTo: 1, tasks: 1, status: 1, _id: 0 })
    res.status(200).send({ status: true, leadsData })
}


const reAllocateLeads = async (req, res) => {
    try {
        const taskData = req.body;
        const employeeId = req.params.employeeId
        //let employeeName = req.body.employeeName
        const { name, email, contact } = taskData;
        const employeeData = await Users.findOne({ employeeId: employeeId });
        if (!employeeData) return res.status(400).send({ status: false, message: "Incorrect Employee id" })
        let newLeads = {
            employeeId: employeeId,
            assignTo: employeeData.name,
            tasks: [{
                "name": name, "email": email.toLowerCase(), "contact": contact
            }]
        }
        await Leads.create(newLeads);
        return res.status(201).send({ status: true, message: "Leads added successfully!" })
    } catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
};

const getLeads = async (req, res) => {
    var leadsData = await Leads.find({ isDeleted: false }).sort({ updatedAt: -1 })
    var arr = leadsData
    let result = []
    var map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (!map.has(arr[i].tasks[0].email)) {
            map.set(arr[i].tasks[0].email, arr[i])
            result.push(arr[i])

        } else {
            continue;
        }
    }
    res.status(200).send({ status: true, result })
}
const leadsStatus = async (req, res) => {
    let status = req.params.status
    const leadsStatus = await Leads.find({ status: status, isDeleted: false }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 });
    if (!leadsStatus) {
        return res.status(200).send('Leads not found!')
    }
    return res.status(200).send({ status: true, leadsStatus });
};

const getSingleLeads = async (req, res) => {
    const clientEmail = req.body.email
    const leads = await Leads.find({ ["tasks.email"]: clientEmail }).select({ employeeId: 1, assignTo: 1, status: 1, tasks: 1, _id: 0 })
    res.status(200).send(leads)
};

const getLeadsByEmployeeId = async (req, res) => {
    const employeeId = req.body.id
    const empLeads = await Leads.find({ employeeId: employeeId })
    res.status(200).send({ status: true, empLeads })
}
const updateStatus = async (req, res) => {
    const employeeId = req.body.id
    const leadEmail = req.body.email
 await Leads.findOneAndUpdate({ "employeeId": employeeId, "tasks.email": leadEmail }, { status: req.body.status }, { new: true })
    res.status(200).send({ status: true, message: "Status updated successfully" });
}

const deleteLeads = async (req, res) => {
    let email = req.body.email
    await Leads.findByIdAndUpdate({ "tasks.email": email }, { isDeleted: true })
    res.status(200).send({ status: true, message: "Leads deleted successfully!" })
}


module.exports = { allocateLeads, reAllocateLeads, getLeads, getSingleLeads, getLeadsByEmployeeId, leadsStatus, updateStatus, deleteLeads }