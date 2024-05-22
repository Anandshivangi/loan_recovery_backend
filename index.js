const express=require('express');
const app = express();
const db=require('./DB/db');
const user_route=require("./master/routes/user")
// const authenticateToken=require("./Middleware/token")


PORT=4000;



app.use(express.json());

// routes
app.use("/api",user_route);

app.get("/",(req,res)=>{
    res.send("hello world")
})



app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
    })