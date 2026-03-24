import express, { json } from 'express'
import { config } from 'dotenv'
import cors from 'cors'
config({ path: "./.env" })
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

export default app;


