const jwt = require('jsonwebtoken');
const { trycatch } = require('../utils/tryCatch');
const { CreateError } = require('../utils/create_err');
const { operatorModel } = require('../../models/operatorModel');



let operator_token_validation = async (req, res, next) => {
    // Check if authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new CreateError('TokenError', "Header is empty");
    }


    const token = authHeader.split(' ')[1];
    // console.log(token)
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);


    // Check if admin exists in the database
    const operator = await operatorModel.findOne({ _id: decoded._id, email: decoded.email });
    console.log(operator, "operator si loging")
    // return console.log(operator);
    if (operator.token !== token) {
        throw new CreateError("TokenError", "token not match in table")
    }
    if (operator.is_admin == 1) {
        req.is_admin = 1
        req.operator = operator
        next()
    }
    else {
        // Attach admin to request object

        req.is_admin = 0
        req.operator = operator

        // Move to next middleware
        next();
    }



};

admin_token_val_middleware = trycatch(admin_token_val_middleware)

module.exports = admin_token_val_middleware;