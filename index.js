const express = require('express');
const app = express();
const db = require('./DB/db');
// const login_route = require("./master/routes/masterUser")
const cors=require("cors")
const rateLimit = require('express-rate-limit');
const { admin_auth_route } = require('./admin/routes/admin_auth_route');
const masterAuthRoute = require('./master/routes/masterUser');
require('dotenv').config();
// require("./db")


app.use("/master",masterAuthRoute)
app.use(express.json());
app.use("/api", login_route);
app.get("/", (req, res) => {
    res.send("hello world")
})


app.use(cors())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});
app.use(limiter);
app.use(express.json({ limit: '5mb' }));


app.use("/admin",admin_auth_route)

app.listen(process.env.port, () => {
    console.log(`server is running on port  ${process.env.port}`);
})
