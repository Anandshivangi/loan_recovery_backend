const mongoose =require('mongoose');
mongoose.set('strictQuery', false);
let DB="mongodb://loan:8421@98.70.11.123:27017/?authSource=RecoveryLoan";
const conn=async()=>{
try{
    await mongoose.connect(DB);
    console.log("mongodb connected...");
}catch(err){
    console.log(err);
}
}
conn();