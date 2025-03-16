const mongoose = require('mongoose');
const UserScehma  = mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[6,"Too short"],
        max:12
    },
    name:
    {
        type:String,
        min:4,
        max:12

    },
    email:
    {
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"]
    },
    age:{
        type:Number,
        required:true,
        min:[18,"Min age is 18"],
        max:[60,"Max age is 60"]
    },
    // password:
    // {
    //     type:String,
    //     required:true,
    //     min:[8,'Password should be atleast 8 characters long'],
    //     max:[16,'Password should be atmost 16 characters long'],
    //     match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, "Invalid password format"]
    // },
    address:{
        type:String,
        required:true,
        min:[10,"Min length is 10"],
        max:50

    }
    // status: {
    //     type: Number,
    //     enum: {
    //         values: [0, 1],
    //         message: "Invalid Status {VALUE}" 
    //     },
    //     required: true
    // }
},{timestamps:true});
module.exports = mongoose.model("User", UserScehma);