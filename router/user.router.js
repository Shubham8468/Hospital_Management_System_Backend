import express from "express"
import {patientRegister,login,addAdmin,getAllDoctores,getUserdetails,logoutAdmin,logoutPeisent,addNewDoctore} from "../controller/userController.js"
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"

const userRouter=express.Router();
userRouter.post("/patient/register",patientRegister);
userRouter.post("/patient/login",login);
userRouter.post("/admin/addnew",isAdminAuthenticated,addAdmin); // new admin ko register kon kra skta hai bus admin hi na 
// to hm isilye ak middlware lga dege ki admin verify hai ya nhi
userRouter.get("/doctors",getAllDoctores);
userRouter.get("/patient/me",isPatientAuthenticated,getUserdetails);
userRouter.get("/admin/me",isAdminAuthenticated,getUserdetails);
userRouter.get("/admin/logout",isAdminAuthenticated,logoutAdmin);
userRouter.get("/patient/logout",isPatientAuthenticated,logoutPeisent);
userRouter.post("/doctor/addnew",isAdminAuthenticated,addNewDoctore);
export default userRouter;