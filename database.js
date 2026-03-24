import mongoose from "mongoose";

export const dbConnect=async ()=>{
    try{
        const dbURL =  process.env.MONGODB_URL;
        if(!dbURL){
            throw new Error("DB Url missing in .env file.");
        }

        await mongoose.connect(dbURL, {
            dbName: "hospital-management"
        });
        console.log("DB connected successfully");
        

    }catch(err){
        if (err?.message?.toLowerCase().includes("bad auth") || err?.codeName === "AuthenticationFailed") {
            console.log("Database authentication failed. Check MongoDB username/password, and URL-encode special characters in password (e.g. @ as %40).");
        }
        console.log(`Somthing wronge During the connect of DB!! ${err}`)
    }
}