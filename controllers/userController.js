const User = require("../database/models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Register a user
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{

const {name,email,password} = req.body;



const user = await User.create({
    name,email,password,
    avatar:{
        public_id:"Sample ID",
        url:"https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1692446625~exp=1692447225~hmac=b76c641703cdaa2194fbd7691878e33b563e82cef304c1fb4d32eeddb0966050"
    }
});


sendToken(user,201,res);

});