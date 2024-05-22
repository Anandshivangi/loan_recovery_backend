const mongoose = require('mongoose');

// Define admin schema
const operatorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    admin: {
        type: String,
    },
    salary: {
        type: Number,
    },
    salary_incentive: {
        type: String,
    },
    monthly_target: {
        type: String,
    },
    target_date: {
        type: Number,
    },
    phoneNo: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String
    },
    joinDate: {
        type: Number
    },
    isOperator: {
        type: Number
    }
});

// Create and export Admin model
const operatorModel = mongoose.model('masterUsers', operatorSchema);

module.exports = {operatorModel};