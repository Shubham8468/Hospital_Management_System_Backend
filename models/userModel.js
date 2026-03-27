import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [30, "Name cannot exceed 30 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your lastName."],
        minlength: [3, "Last Name be at least 3 characters"],
        maxlength: [30, "Last Name can not exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        validate: {
            validator: function (v) {
                return /^[6-9]\d{9}$/.test(v); // Indian phone number
            },
            message: "Please enter a valid 10-digit Indian phone number"
        }
    },
    aadhaarNumber: {
        type: String,
        required: [true, "Please enter your Aadhaar number"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{12}$/.test(v); // 12 digit Aadhaar
            },
            message: "Aadhaar number must be 12 digits"
        },
        select: false //  hide by default (important)
    },
    dob: {
        type: Date,
        required: [true, "Please enter your date of birth"],
        validate: {
            validator: function (value) {
                return value < new Date(); // DOB must be in past
            },
            message: "Date of birth cannot be in the future"
        }
    },
    gender: {
        type: String,
        required: [true, "Please select your gender"],
        enum: {
            values: ["male", "female", "other"],
            message: "Gender must be male, female, or other"
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password must contain at last 8 characters!."],
        select:false // when i get user password by default hidden
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
         public_id:String,
         url:String
    }
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// for the user password compair During the Logging

userSchema.methods.comparePassword=async function (enterdPassword){
   return await bcrypt.compare(enterdPassword,this.password)
}

userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({
        id:this._id,  
    },process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    }
)
}
export const User= mongoose.model("User",userSchema)