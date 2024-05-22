const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { masterUsers } = require("../../models/masteUsersModel");
const { CreateError } = require('../../utils/createErr');
// const { CreateError } = require("../../utils/createErr")

// Route for user registration
const register = async (req, res) => {
  const { phoneNo, password } = req.body;
  // validate
  const userSchemaValidation = Joi.object({
    phoneNo: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = userSchemaValidation.validate(req.body);
  if (error) {
    throw new CreateError("CustomError", `${error.details.message}`)
  }


  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new masterUsers({
    phoneNo,
    password: hashedPassword,
  });

  await user.save();
  //    res.send('User registered successfully');
  res.json({
    status: 1,
    message: "Registered successfully"
  })
}

///login


const login = async (req, res) => {

  const { phoneNo, password } = req.body;



  // validate
  const userSchemaValidation = Joi.object({
    phoneNo: Joi.string().required(),
    password: Joi.string().required(),
  });
  // check error after validation type of data
  const { error } = userSchemaValidation.validate(req.body);
  if (error)
    throw new CreateError("CustomError", `${error.details.message}`)
  // return res.status(400).send(error.details[0].message);
  // find data
  const user = await masterUsers.findOne({ phoneNo });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!user)
    return res.json({
      status: 0,
      message: 'Invalid credentials'
    });

  if (!validPassword) return res.status(400).send('Invalid credentials');

  const SECRET_KEY = 'your_jwt_secret_key';
  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  user.token = token;
  await user.save();
  //   res.status(200).send('Pre-defined user login successful');
  res.json({
    status: 1,
    message: 'Login successful',

  });

  // res.send({status:1})
  // token


  // console.log(token);



}

var addAdmin = async (req, res, next) => {


  const schema = Joi.object({
      phoneNo: Joi.string().max(50).required(),
      joinDate: Joi.string()
          .regex(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/)
          .message("Invalid date-time format. Please use DD-MM-YYYY HH:mm:ss")
          .required(),
      //   password: Joi.string().max(50).required(),
      //   username: Joi.string().max(50).required(),

  });
  const { error } = await schema.validateAsync(req.body);

  let {
      phoneNo,
      joinDate
  } = req.body;

  joinDate = moment(joinDate).valueOf();
  const timestamp = Date.now();

  const randomNum = Math.random().toString().substring(111, 999);
  const adminId = `ADMIN-${timestamp}-${randomNum}`;





  // Check if admin with the same username or email already exists
  // const existingAdmin = await masterUsers.findOne({ phoneNo});
  // if (existingAdmin) {
  //   // return res.status(400).json({ message: 'Admin with the same username or email already exists' });
  //   throw new CreateError("Validation Error", "Admin with the same username or email already exists")
  // }

  const hashedPassword = await bcrypt.hash(adminId, 10);
// return console.log(0);
  // Create a new admin
  const newAdmin = new masterUsers({
      //   name: username,
      adminId,
      password:
      phoneNo,
      password: hashedPassword,

      joinDate,
      isMaster: 0
  });

  // Save the new admin to the database
  await newAdmin.save();

  res.json({
      status: 1,
      message: 'Admin registered successfully',

  });
}



// Get and Search Data with Pagination
const getAdmin=async (req, res) => {

    try {
          //  const Users_data = await masterUsers.find({}, 'adminName empID bankName area');
          //   res.json(Users_data);
          //   res.status(500).json({ message: err.message });
            
        const { page = 1, limit = 10, search = '' } = req.query;

        const query = {
            $or: [
                { adminName: { $regex: search, $options: 'i' } },
                { empID: { $regex: search, $options: 'i' } },
                { bank_name: { $regex: search, $options: 'i' } },
                { area: { $regex: search, $options: 'i' } }
            ]
        };

        const Users = await User.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .exec();

        const count = await User.countDocuments(query);

        res.json({
            Users,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}


module.exports = { register, login,addAdmin,getAdmin }