const express = require("express")
let server = express()
let port = 3000
 
//server.get("/",(req,res) => {
    //res.send("<h1>Hello</h1>")
//})
server.post("/",(req,res) => {
    res.send("<h1>Welcome</h1>")
})
 

server.listen(port, () => {
    console.log("Server is listening in port ", port)
})