export const catchAsyncError=(theFuction)=>{
    return(req,resp,next)=>{
        Promise.resolve(theFuction(req,resp,next)).catch(next);
    }
}