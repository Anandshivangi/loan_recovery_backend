const express=require("express");
const masterAuthRoute = express.Router();
const {login,register, addAdmin}=require("../controllers/master_auth_controller");
// const { adminregister } = require("../../admin/Controllers/admin_auth_controller");
// const register=require("../controllers/masterRegister");


masterAuthRoute.route('/master_login').post(login);
masterAuthRoute.route('/master_register').post(register);
masterAuthRoute.route("/add/admin").post(addAdmin)


module.exports = masterAuthRoute;