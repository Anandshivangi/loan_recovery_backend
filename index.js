const express=require('express');
const app = express();
const db=require('./DB/db');
const login_route=require("./master/routes/userLogin")
PORT=4000;

app.use(express.json());
app.use("/api",login_route);
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
    })