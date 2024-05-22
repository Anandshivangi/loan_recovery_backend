const joi = require("joi");
const { CreateError } = require("../../utils/createErr");
const { trycatch } = require("../../utils/tryCatch");
const { operatorModel } = require("../../models/operatorModel");



var operatorLogin = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        contact: joi.string().required(),
        admin: joi.string().required(),
        salary: joi.string().required(),
        monthly_target: joi.string().required(),
        target_date: joi.string().required(),
        salary_incentive: joi.string().required(),
    })

    const { error } = schema.validateAsync(req.body);
    if (error) {
        throw new CreateError("CustomError", `${error.details.message}`)
    }

    const insertquery = operatorModel(req.body)
    await insertquery.save();

    if (insertquery) {
        res.send({
            status: 1, message: "user created successfully"
        })
    }

}


operatorLogin = trycatch(operatorLogin)



module.exports = {
    operatorLogin
}