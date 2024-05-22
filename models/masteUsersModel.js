const mongoose = require('mongoose');

// Define admin schema
const adminSchema = new mongoose.Schema({
  userId: {
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
    type: integer
  },
  isMAster:{
    type:integer
  }
});

// Create and export Admin model
const masterUsers = mongoose.model('masterUsers', adminSchema);

module.exports = masterUsers;