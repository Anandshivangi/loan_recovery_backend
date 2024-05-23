const jwt = require("jsonwebtoken");
require('dotenv').config()
const { masterUsers } = require("../models/masteUsersModel");

const user_token_val = async (req, res, next) => {
  try {
    let token = req.header("authorization");

    if (!token) {
      return res.json({ status: '002', msg: "Please provide token in header" });
    }

    token = token.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"

    const decoded= jwt.verify(token, process.env.user_key);

    const user = await masterUsers.findOne({_id:decoded._id,token:token})
    //  console.log(user);
     
    if (!user || !user.token) {
      return res.send({
        status: '002',
        message: "Token has been revoked. Please log in again.",
      });
    }

    if (user.token !== token) {
      return res.send({ status: '002', message: "You are not the correct user." });
    }

    req._id = user._id;
    // console.log(user._id)
    // console.log(req._id)
    next();
  } catch (error) {
    res.send({ status: '002', msg: "Invalid or expired token" });
  }
};

module.exports = user_token_val;
