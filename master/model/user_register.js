const mongoose=require('mongoose');
// Define the User model
const userSchema = new mongoose.Schema({
    mobile: String,
    password: String,
    token: { type: String }
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports=User;