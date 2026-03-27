import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.middleware.js"
import { User } from "../models/userModel.js"
import { generateJWT } from "../utils/jwtToken.js"
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
        password ,
        role:"Admin" // this is the static value that i add in DB
    })

    generateJWT(admin,"New Admin Registered!",200,resp);


})