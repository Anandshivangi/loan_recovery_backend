const mongoose =require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
// let DB=process.env.db_url
const conn=async()=>{
try{
    await mongoose.connect(process.env.db_url);
    console.log("mongodb connected...");
}catch(err){
    console.log(err);
}
}
conn();