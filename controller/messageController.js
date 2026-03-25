import { Message } from "../models/messageModel.js"
import {catchAsyncError} from "../middlewares/catchAsyncError.js"

export const sendMessage = catchAsyncError (async (req, resp, next) => {
        const { firstName, lastName, email, phone, message } = req.body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return resp.status(400).json({ success: false, message: "Please provide all details." })
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