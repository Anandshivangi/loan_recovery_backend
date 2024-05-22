const express=require("express");
const userRoute = express.Router();
const {login,register}=require("../controllers/master_auth_controller")
// const register=require("../controllers/masterRegister");


userRoute.route('/master_login').post(login);
userRoute.route('/master_register').post(register);


module.exports = userRoute;