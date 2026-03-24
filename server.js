import app from  "./app.js"
import cloudinary from "cloudinary"

cloudinary.v2.config({ // here we are configuring the cloudinary with the credentials which we get from cloudinary account
    cloud_name:process.env.CLOUDINSRY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINSRY_API_SECRET
})


const port = process.env.PORT || 3600;

app.listen(port,()=>{
    console.log(`Server listeing on ${port} port `)
})