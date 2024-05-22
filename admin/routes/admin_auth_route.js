const express=require("express");
const { login, register, addAdmin } = require("../Controllers/master_auth_controller");
// const { adminregister } = require("../Controllers/master_auth_controller");

const masterAuthRoute=express.Router();

masterAuthRoute.route('/master_login').post(login);
masterAuthRoute.route('/master_register').post(register);
masterAuthRoute.route("/add/admin").post(addAdmin)

module.exports={masterAuthRoute}