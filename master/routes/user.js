const express=require("express");
const userRoute = express.Router();
const login=require("../controllers/userLogin");
const register=require("../controllers/userRegister");


userRoute.route('/user_login').post(login);
userRoute.route('/user_register').post(register);


module.exports = userRoute;