import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.middleware.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/userModel.js"
export const isAdminAuthenticated = catchAsyncError(async (req, resp, next) => {
    const token = req.cookies.adminToken; // First we get admin Token 
    if (!token) {
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);//// then check token is verify or not


    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403))
    }
    next();
})


export const isPatientAuthenticated = catchAsyncError(async (req, resp, next) => {
    const token = req.cookies.patientToken; // First we get admin Token 
    if (!token) {
        return next(new ErrorHandler("Patient Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);//// then check token is verify or not
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403))
    }
    next();

})

