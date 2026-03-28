import mongoose from "mongoose"
import validator from 'validator'
const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    doctor:{
       firstName:{
        type:String,
        required:true
       },
       lastName:{
        type:String,
        required:true
       }
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctoreId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }

})

export const  Appointment= mongoose.model("Appointment",appointmentSchema);