const express = require("express")

const app = express()
const port = 3000


const rateLimit = require('express-rate-limit');
require('dotenv').config();

require("./db")

const cors = require('cors');
app.use(cors())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
});
app.use(limiter);

app.use(express.json())







app.use(async (err, req, res, next) => {

    if (err.name === "FileValError") {
        return res.send({ status: "FILE_VAL_ERR", Backend_Error: err.message })
    }

    console.log(err);

    res.send({ status: "INT_ERR", Backend_Error: err.message });

});


app.get("/check", async (req, res) => {
    res.send({ status: "8421", Backend_Error: "loan recovery is working" });
});

app.use("*", async (req, res) => {
    res.send({ status: "6320", Backend_Error: "there  is no route like this" });
});

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})