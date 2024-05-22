const User=require('../model/user_register');
const Joi=require("joi");
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const login=async(req,res)=>{

const {mobile,password}=req.body;



// validate
const userSchemaValidation = Joi.object({
    mobile: Joi.string().required(),
    password: Joi.string().required(),
  });
  // check error after validation type of data
  const { error } = userSchemaValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 // find data
  const user = await User.findOne({ mobile });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!user) return res.status(400).send('Invalid credentials');

  if (!validPassword) return res.status(400).send('Invalid credentials');
  res.status(200).send('Pre-defined user login successful');

  
  // token

  const SECRET_KEY = 'your_jwt_secret_key';
  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  user.token = token;
  await user.save();
// console.log(token);



}
module.exports=login