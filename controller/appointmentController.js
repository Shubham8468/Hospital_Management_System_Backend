import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.middleware.js"
import { Appointment } from "../models/appointmentModel.js"
import { User } from "../models/userModel.js"

export const postAppointment = catchAsyncError(async (req, resp, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        aadhaarNumber,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,

    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !aadhaarNumber ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        hasVisited === undefined ||
        !address
    ) {
        return next(new ErrorHandler("Please provide all details!", 400))
    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    })
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor Not Found!.", 404))
    }
    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctors Conflict! Please Contact Through Email or Phone.", 404))
    }
    const doctoreId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        aadhaarNumber,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited,
        address,
        doctoreId,
        patientId
    })

    return resp.status(200).json({success:true,message:"Appointemt Sent Successfully!.",appointment})

})

export const getAllAppointment= catchAsyncError(async (req,resp,next)=>{
    const allAppointment= await Appointment.find();
    return resp.status(200).json({success:true,message:"All Appoinment fatch From DB!.",allAppointment})
})


export const updateAppointmentStatus=catchAsyncError( async (req,resp,next)=>{
    const {id}=req.params;
    let appointment= await Appointment.findById(id);
    if(!appointment){
        return next( new ErrorHandler("Appointment Not Found!",404));
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new :true,
        runValidators:true,
        useFindAndModify:true
    });
    return resp.status(200).json({success:true,
        appointment,message:"Status Update Successfully!"
    })

})

export const deleteAppointment=catchAsyncError(async (req,resp,next)=>{
    const {id}=req.params;
    let deleteAppointment= await Appointment.findById(id);
    if(!deleteAppointment){
        return next(new ErrorHandler("Appointmnet Not Found!",404));
    }

    await deleteAppointment.deleteOne();
    return resp.status(200).json({success:true,message:"Appointment Deleted Successfully!"});
})