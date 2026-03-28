import { Message } from "../models/messageModel.js"
import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.middleware.js";

export const sendMessage = catchAsyncError (async (req, resp, next) => {
        const { firstName, lastName, email, phone, message } = req.body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return next(new ErrorHandler("Please Fill Full Form!.",400))
        }

        const messageStore = await Message.create({ firstName, lastName, email, phone, message });
        if (!messageStore) {
            return resp.status(500).json({ success: false, message: "Message not send successfully!" })
        }

        return resp.status(200).json({
            success:true,
            message:"Message send successfully"
        })
})

export const getAllMessages= catchAsyncError( async (req,resp,next)=>{
    const messages= await Message.find();
    return resp.status(200).json({success:true,messages})
})