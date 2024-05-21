const express=require("express");
const userRoute = express.Router();
const login=require("../controllers/userLogin");

userRoute.route('/user_login').post(login);



module.exports = userRoute;