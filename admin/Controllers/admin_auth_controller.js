var adminregister = async (req, res, next) => {


    const schema = Joi.object({
      email: Joi.string().max(50).required(),
      password: Joi.string().max(50).required(),
    //   username: Joi.string().max(50).required(),
  
    });
  
    // console.log("hello")
    const timestamp = Date.now();

    // Generate a random number between 0 and 1, then convert it to a string and remove "0."
    const randomNum = Math.random().toString().substring(2, 10);

    // Combine timestamp and random number to form a unique ID
    const adminId = `ADMIN-${timestamp}-${randomNum}`;
    

    const { error } = await schema.validateAsync(req.body);
  
  
    const {email, password } = req.body;
  
    // Check if admin with the same username or email already exists
    const existingAdmin = await userModel.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      // return res.status(400).json({ message: 'Admin with the same username or email already exists' });
      throw new CreateError("Validation Error", "Admin with the same username or email already exists")
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new admin
    const newAdmin = new userModel({
      name: username,
      email,
      password: hashedPassword,
      is_admin: 1
    });
  
    // Save the new admin to the database
    await newAdmin.save();
  
    res.json({
      status: 1,
      message: 'Admin registered successfully',
     
    });
  }
  