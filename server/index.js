const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/routes/route');
const socket = require('socket.io');
const multer = require('multer')
const app = express()
const cors=require("cors")
app.use(cors())
const Leads=require("./src/models/leadsModel")
const cookieParser=require("cookie-parser")
app.use(express.json());
app.use(cookieParser())
app.use(multer().any())


const connection_url = "mongodb+srv://kishor7008:kishor7008@cluster0.msynbs7.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 4000;

mongoose.connect(connection_url, {
    useNewUrlParser:true
})
.then(()=> console.log("Database is connected"))
.catch((err)=> console.log(err))

app.use('/', route);
app.get("/next",async(req,res)=>{
  let data=await  Leads.findOne({ "tasks.name": "gg" })
  res.json(data)
})

const server = app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}


const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}
io.on("connection", (socket) => {

    console.log("a user connected")
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    })
    
socket.on("increament",(store)=>{
  let user=getUser(store.employeeId)
  io.to(user.socketId).emit("getValue",store.value)
})

    socket.on("disconnect", () => {
        console.log("disconnected")
        removeUser(socket.id)
    })
})
