const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../database/models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{

const {token} = req.cookies;

if(token === 'j:null'){
    return next(new ErrorHandler("Please Login to continue",401));
}

const decodedData = jwt.verify(token,process.env.JWT_SECRET);

req.user = await User.findById(decodedData.id);

next();

});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    };
};