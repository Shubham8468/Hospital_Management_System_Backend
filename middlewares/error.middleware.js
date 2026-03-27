class ErrorHandler extends Error{
   constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
   }
} 
// is middelware ko sbse last me use krte hai app vale file me 
export const ErrorMiddleware=(err,req,resp,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;
    if(err.code ===11000){
        const message=`Dyplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message,400)
    }
    if(err.name ==="JsonWebTokenError"){
        const message="Json Web Token is Invalid, Try Again!.";
        err=new ErrorHandler(message,400)
    }
    if(err.name==="TokenExpiredError"){
        const message="Json Web Token is Expaird, Try Again!.";
        err= new ErrorHandler(message,400)
    }
   
    if(err.name  ===`CastError`){ 
//      1:- In Mongoose, a CastError happens when:
//          . You pass an invalid value to MongoDB
//          . Most commonly → invalid ObjectId

        const message=`Invalid ${err.path}`; //err.path → tells which field caused the error
        err=new ErrorHandler(message,400)
    }

    // ab ye sb server ko response kra denge
    // ye hm keval error message ko extract krne ke liye kiye hai
    const errorMessage=err.errors ? Object.values(err.errors).map((error)=>error.message).join(" ,"):err.message

    return resp.status(err.statusCode).json({success:false,message:errorMessage})

}

export default ErrorHandler