const mongoose = require('mongoose');

// Define admin schema
const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
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
    isMAster: {
        type: Number
    }
});

// Create and export Admin model
const masterUsers = mongoose.model('masterUser', adminSchema);

module.exports = { masterUsers };