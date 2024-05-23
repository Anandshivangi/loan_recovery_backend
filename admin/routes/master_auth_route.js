const express=require("express");
const { login, register, addAdmin,getAdmin,changePassword } = require("../Controllers/master_auth_controller");
// const { adminregister } = require("../Controllers/master_auth_controller");
const user_token_val=require("../../middleware/token")
const masterAuthRoute=express.Router();

masterAuthRoute.route('/master_login').post(login);
masterAuthRoute.route('/master_register').post(register);
masterAuthRoute.route("/add/admin").post(addAdmin)
masterAuthRoute.route("/getadmin").get(getAdmin);
masterAuthRoute.route("/changepassword").post(user_token_val,changePassword);

module.exports={masterAuthRoute}