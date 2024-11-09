
const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN;
// const { Schema, model } = mongoose;
mongoose.connect(mongo_url)
.then(()=>{
    console.log("MongoDB connected...")
})
.catch((err)=>{
    console.log("mongoDB connection error: ",err);
})
const userSchema = new mongoose.Schema({
username: {
type: String,
required: true,
//unique: true, // Ensure usernames are unique
},
email: {
type: String,
required: true,
unique: true, // Ensure emails are unique
},
password: {
type: String,
required: true,
},
walletId: {
type: String,
},
department: {
type: String,
required: true,
enum: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Physics', 'Chemistry'], // Enforce valid departments
},
clubs: {
type: [String], 
default: [],  
},
isAdmin:{
type:Boolean,
default:false,
}
}, { timestamps: true } ); 

const User = mongoose.model('User', userSchema);

module.exports = User;