import { useEffect,useState } from "react"
import {io} from "socket.io-client"
const Page=()=>{
    const user=localStorage.getItem("user")
const[length,setLength]=useState()
const[socket,setSocket]=useState(io("ws://localhost:4000"))
const [notification,setNotification]=useState()
const token=localStorage.getItem("token")
    const callPending=()=>{
        fetch("http://localhost:4000/employee/leads",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Authorization":`Bearer ${token} `
            }
        }).then(res=>res.json())
    .then(data=>{setLength(data.length)
    console.log(data)})
}
useEffect(() => {
    callPending()
    socket.emit("addUser",user)
    socket.on("getUsers",users=>{
     console.log(users)
    })
    socket.on("data",users=>{
        console.log(users)
       })
 }, [user])
 

 const add=()=>{
    
    socket.emit("increament",{
        value:50,
        employeeId:"babul7008"
    })
    socket.emit("increament",{
        value:30,
        employeeId:"priti7008"
    })

 }
 useEffect(()=>{
    socket.on("getValue",(data)=>{
        setNotification(data)
    })
 })
console.log(socket)
    return(
        <>
       {length}
       {user}
       <button onClick={add}>addd</button>
       {notification}
        </>
    )
}
export default Page;