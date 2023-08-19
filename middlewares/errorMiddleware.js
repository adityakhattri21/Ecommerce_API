const errorHandler = require("../utils/errorHandler");

const errorMiddleware = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";



    if(err.name === "CastError"){
        const message = `Resource Not Found. Invalid ${err.path}`;
        err = new errorHandler(message,400);
    }

    if(err.code === 11000 ){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new errorHandler(message,400);
    }

    if(err.name === `JsonWebTokenError` ){
        const message = `Json Web Token is Invalid , Retry`;
        err = new errorHandler(message,400);
    }

    if(err.name === `TokenExpiredError` ){
        const message = `Json Web Token has Expired , retry`;
        err = new errorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}

module.exports = errorMiddleware;