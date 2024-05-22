 const User=require("../model/masterRegister");
 const Joi=require('joi');
 const bcrypt = require('bcryptjs');

// Route for user registration
const register=async(req, res) => {
  const {mobile,password}=req.body;
  // validate
const userSchemaValidation = Joi.object({
  mobile: Joi.string().required(),
  password: Joi.string().required(),
});
    const { error } = userSchemaValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      mobile,
      password: hashedPassword,
    });
  
    await user.save();
    res.send('User registered successfully');
}
  module.exports=register