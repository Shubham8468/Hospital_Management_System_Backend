import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain At Least 3 Characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Must Contains At Least 3 Characters!"]
    },
    email:{
        type:String,
        required:true,
        validate: [
            (value) => /^\S+@\S+\.\S+$/.test(value),
            "Please Provied a valid Email!"
        ]
    },
    phone:{
          type:Number,
          required:true,
          minLength:[10,"Phone Number Must Contains Exact 11 Digits!"],
          maxLength:[10,"Phone Number Must Contains Exact 11 Digits!"],
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message Must Contain At Least 10 Charecters!"]
    }
    



})

export const Message = mongoose.model("Message",messageSchema);