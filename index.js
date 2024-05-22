const express = require('express');
const app = express();
const db = require('./DB/db');
const login_route = require("./master/routes/masterUser")
const cors = require("cors")
const rateLimit = require('express-rate-limit');
const { operator_auth_route } = require('./operator/routes/operator_auth_route');
const { admin_auth_route } = require('./admin/routes/admin_auth_route');
require('dotenv').config();
// require("./db")



app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("hello world")
// })


app.use(cors())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});
app.use(limiter);
app.use(express.json({ limit: '5mb' }));

// routes for master_Admin 
app.use("/master", login_route);




// routes for Admin 

app.use("/admin", admin_auth_route)



// routes for operator 

app.use("/operator", operator_auth_route);



// routes for team leader 




// routes for agents





app.use(async (err, req, res, next) => {

  if (err.name === "FileValError") {
    return res.send({ status: "FILE_VAL_ERR", Backend_Error: err.message })
  }

  console.log(err);

  res.send({ status: "INT_ERR", Backend_Error: err.message });

});


app.get("/check", async (req, res) => {
  res.send({ status: "8421", Backend_Error: "auth microservice is working" });
});

app.use("*", async (req, res) => {
  res.send({ status: "6320", Backend_Error: "there  is no route like this" });
});


app.listen(process.env.port, () => {
  console.log(`server is running on port  ${process.env.port}`);
})



