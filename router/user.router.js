import express from "express"
import {patientRegister,login,addAdmin} from "../controller/userController.js"
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"

const userRouter=express.Router();
userRouter.post("/patient/register",patientRegister);
userRouter.post("/patient/login",login);
userRouter.post("/admin/addnew",isAdminAuthenticated,addAdmin); // new admin ko register kon kra skta hai bus admin hi na 
// to hm isilye ak middlware lga dege ki admin verify hai ya nhi

export default userRouter;