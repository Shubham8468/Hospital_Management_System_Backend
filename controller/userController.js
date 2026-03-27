import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.middleware.js"
import { User } from "../models/userModel.js"
import { generateJWT } from "../utils/jwtToken.js"
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncError(async (req, resp, next) => {
    const { firstName, lastName, email, phone, aadhaarNumber, dob, gender, password, role } = req.body;
    if (!firstName || !lastName || !email || !phone || !aadhaarNumber || !dob || !gender || !password || !role) {
        return next(new ErrorHandler("Please Fill Full Form", 400))
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already Registerd!", 400));
    }
    user = await User.create({ firstName, lastName, email, phone, aadhaarNumber, dob, gender, password, role });
    // here we generate a JWT token 

    generateJWT(user, "User Registerd!", 200, resp);// is function se  final response krege .
})

// for the Loging user

export const login = catchAsyncError(async (req, resp, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details!", 400))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and ConfirmPassword not Match!,Enter Again."));
    }
    const user = await User.findOne({ email }).select("+password") // ye hm isliye kiye hai ki user ko get krte time pass bhi 
    // to chahiye na   select:false // when i get user password by default hidden
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email ", 400))
    }
    // ab password ko match kra rhe hai
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password or Email ", 400))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found!.", 400))
    }

    generateJWT(user, "User Login Successfully!", 200, resp)

})
export const addAdmin = catchAsyncError(async (req, resp, next) => {
    const { firstName, lastName, email, phone, aadhaarNumber, dob, gender, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !aadhaarNumber || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Provids All Details!", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(` ${isRegistered.role} With This Email allready Registerd!`, 400))
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        aadhaarNumber,
        dob,
        gender,
        password,
        role: "Admin" // this is the static value that i add in DB
    })
    generateJWT(admin, "New Admin Registered!", 200, resp);
})

export const getAllDoctores = catchAsyncError(async (req, resp, next) => {
    const doctore = await User.find({ role: "Doctor" });
    return resp.status(200).json({ message: "All Doctore Fatch form DB", success: true, doctore })
})

export const getUserdetails = catchAsyncError(async (req, resp, next) => {
    const user = req.user;
    return resp.status(200).json({
        success: true,
        message: "User Fetch From DB",
        user
    })
})

export const logoutAdmin = catchAsyncError(async (req, resp, next) => {
    return resp.status(200).cookie("adminToken",
        "",
        {
            httpOnly: true,
            expires: new Date(Date.now()),
        }
    ).json({ success: true, message: "Admin Logout Successfully!." })
})

export const logoutPeisent = catchAsyncError(async (req, resp, next) => {
    return resp.status(200).cookie("patienttoken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({ success: true, message: "Peisent Logout Successfully!." })
})


export const addNewDoctore = catchAsyncError(async (req, resp, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctore Avatar Required!", 400));
    }
    const { docAvatar } = req.files; // get the url of Avatar from the frontend
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {//here we check the uploaded image formet match the our role or not 
        return new (new ErrorHandler("File Formet Not Supported!", 400));
    }
    const { 
        firstName,
        lastName,
        email,
        phone,
        aadhaarNumber,
        dob,
        gender,
        password,
        doctorDepartment
    } = req.body;
    if (!firstName || !lastName || !email || !phone || !aadhaarNumber || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please Provide All Details!"))
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email.`, 400))
    }
    // Now i Post Doctore Img On Cloudnary 
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath // Take this temporary file from my server and upload it to Cloudinary”
    );
    console.log(cloudinaryResponse); // for the check what its return 
    if (!cloudinaryResponse || !cloudinaryResponse.error) {
        console.error("cloudinary Error:", cloudinaryResponse.error || "Unknow cloudinary Error")
    }
    const doctore = await User.create({
        firstName,
        lastName,
        email,
        phone,
        aadhaarNumber,
        dob,
        gender,
        password,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id, //here we put cloudniary public url in DB
            url: cloudinaryResponse.secure_url,
        }

    })

    return resp.status(200).json({ success: true, message: "New Doctore Add Successfully!.", doctore })


})
