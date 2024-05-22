const Joi = require("joi");
const { CreateError } = require("../../utils/createErr");
const { trycatch } = require("../../utils/tryCatch");
const { operatorModel } = require("../../models/operatorModel");


var operatorLogin = async (req, res) => {

    const { phoneNo, password } = req.body;



    const userSchemaValidation = Joi.object({
        phoneNo: Joi.string()
            .pattern(/^[6-9]\d{9}$/)
            .required(),
        password: Joi.string().required(),
    });

    const { error } = userSchemaValidation.validateAsync(req.body);
    if (error)
        throw new CreateError("CustomError", `${error.details.message}`)


    const user = await operatorModel.findOne({ phoneNo });
    if (!user) {
        res.json({
            status: 0,
            message: 'No operator found of this mobile no'
        });
    }
    else {

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.json({
                status: 0,
                message: 'Incorrect password'
            });
        }
        else {

            const token = jwt.sign({ _id: user._id, }, process.env.SECRET_KEY, { expiresIn: '10d' });

            await operatorModel.updateOne(
                { phoneNo },
                { $set: { token } }
            )
            return res.send({ status: 1, token, message: "login sucessfull" })

        }

    }



}


// var addOperator = async (req, res) => {
//     const schema = joi.object({
//         name: joi.string().required(),
//         contact: joi.string().required(),
//         admin: joi.string().required(),
//         salary: joi.string().required(),
//         monthly_target: joi.string().required(),
//         target_date: joi.string().required(),
//         salary_incentive: joi.string().required(),
//     })

//     const { error } = schema.validateAsync(req.body);
//     if (error) {
//         throw new CreateError("CustomError", `${error.details.message}`)
//     }

//     const insertquery = operatorModel(req.body)
//     await insertquery.save();

//     if (insertquery) {
//         res.send({
//             status: 1, message: "user created successfully"
//         })
//     }

// }

// addOperator = trycatch(addOperator)
// module.exports = {
// addOperator
// }

operatorLogin = trycatch(operatorLogin)

module.exports = {
    operatorLogin
}

