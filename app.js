import express, { json } from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { dbConnect } from './database.js';
import cookieParser from "cookie-parser"
config({ path: "./config/.env" })
import router from './router/message.router.js';
const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL,process.env.DASHBORD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}
))

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true})) // for the 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
})); /// for the handel file upload 
app.use("/api/v1/message",router);
dbConnect();

export default app;


