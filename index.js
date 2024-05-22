const express = require('express');
const app = express();
const db = require('./DB/db');
const login_route = require("./master/routes/userLogin")
const cors=require("cors")
const rateLimit = require('express-rate-limit');
require('dotenv').config();
// require("./db")

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


app.listen(process.env.port, () => {
    console.log(`server is running on port  ${process.env.port}`);
})