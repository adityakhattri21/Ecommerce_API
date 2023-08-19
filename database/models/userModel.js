const mongoose = require("mongoose");
const validator = require("validator");
const moment = require("moment");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot be more than 30 characters."],
        minLength:[3,"Name cannot be less than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Plese Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter the Password"],
        minLength:[4,"Password cannot be less than 4 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    createdAt:{
        type:String,
        default:()=>moment().utcOffset("+05:30").format("DD-MM-YYYY HH:mm:ss")
    }
});

userSchema.pre("save" , async function(next){ //pre is like a listener for event "save".

    if(!this.isModified("password")){ //isModified returns true if the field is modified. 
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password);

};

module.exports = mongoose.model("User",userSchema);
