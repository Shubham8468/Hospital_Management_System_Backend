
export const generateJWT=(user,message,statusCode,resp)=>{
    const token= user.generateJsonWebToken();
    const cookieName=user.role==="Admin" ? "adminToken" : "patienttoken"; // cookie Name de rhe hai 
    resp.status(statusCode).cookie(cookieName,token,{
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRE * 24 *60 * 60 * 1000), 
        httpOnly:true,
    }).json({success:true,message:message,user,token});
}