import express from "express"
import {isPatientAuthenticated,isAdminAuthenticated } from "../middlewares/auth.js"
import {postAppointment,getAllAppointment,updateAppointmentStatus,deleteAppointment} from "../controller/appointmentController.js"
const appointmentRouter= express.Router();
appointmentRouter.post("/post",isPatientAuthenticated,postAppointment);
appointmentRouter.get("/get",isAdminAuthenticated,getAllAppointment);
appointmentRouter.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);
appointmentRouter.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
export default appointmentRouter;