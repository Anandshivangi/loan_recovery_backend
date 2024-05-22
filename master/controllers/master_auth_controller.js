const Joi=require('joi');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const { masterUsers } = require("../../models/masteUsersModel");
const { CreateError } = require('../../utils/createErr');
// const { CreateError } = require("../../utils/createErr")


// Route for user registration
const register=async(req, res) => {
 const {phoneNo,password}=req.body;
 // validate
const userSchemaValidation = Joi.object({
 phoneNo: Joi.string().required(),
 password: Joi.string().required(),
});

   const { error } = userSchemaValidation.validate(req.body);
   if (error) {
    throw new CreateError("CustomError" , `${error.details.message}`)
   }
 
 
   // Hash the password
   const hashedPassword = await bcrypt.hash(password, 10);
 
   const user = new masterUsers({
     phoneNo,
     password: hashedPassword,
     isMAster:1
   });
 
   await user.save();
//    res.send('User registered successfully');
res.json({
    status:1,
    message:"Registered successfully"
})
}

///login


const login=async(req,res)=>{

const {phoneNo,password}=req.body;



// validate
const userSchemaValidation = Joi.object({
    phoneNo: Joi.string().required(),
    password: Joi.string().required(),
  });
  // check error after validation type of data
  const { error } = userSchemaValidation.validate(req.body);
  if (error) 
    throw new CreateError("CustomError" , `${error.details.message}`)
    // return res.status(400).send(error.details[0].message);
 // find data
  const user = await masterUsers.findOne({ phoneNo });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!user) 
    return res.json({
                status:0,
                message:'Invalid credentials'
            });

  if (!validPassword) return res.status(400).send('Invalid credentials');
//   res.status(200).send('Pre-defined user login successful');
res.json({
    status: 1,
    message: 'Login successful',
   
  });

  // res.send({status:1})
  // token

  const SECRET_KEY = 'your_jwt_secret_key';
  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  user.token = token;
  await user.save();
// console.log(token);



}

 module.exports={register,login}