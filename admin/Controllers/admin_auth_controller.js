const masterUsers= require("../../models/masteUsersModel");
const { CreateError } = require("../../utils/createErr");
const { trycatch } = require("../../utils/tryCatch");
const Joi = require("joi")
const bcrypt = require("bcryptjs");
const moment = require("moment")
var adminregister = async (req, res, next) => {


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

adminregister = trycatch(adminregister)

module.exports = { adminregister }
