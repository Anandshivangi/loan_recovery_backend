const express=require("express");
const { adminregister } = require("../Controllers/admin_auth_controller");

const admin_auth_route=express.Router();

admin_auth_route.route("/registration").post(adminregister)

module.exports={admin_auth_route}