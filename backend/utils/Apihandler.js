const Apihandler = requestfunction => async(req,res,next)=>{
    try {
       return requestfunction(req,res, next)
    } catch (error) {
       next(error) 
    }
}

export default Apihandler