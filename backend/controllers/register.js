import login from "../models/login.js";
import Apihandler from "../utils/Apihandler.js";
import ApiError from "../utils/ApiError.js";
const register = Apihandler(async(req,res)=>{
    const {email, password, source, username} = req.body;
    // console.log(source)
    if(source !== 1){
        res.send("Invalid source")
    }
    if(username.trim() == ""){
        res.send("Username required")
        throw new ApiError("Username required")
    }
    if(email.trim() == ""){
        res.send("Email required")
        throw new ApiError("Email required")
    }
    if(!email.includes("@")){
        res.send("Email incorrect")
        throw new ApiError("Email incorrect")
    }
    if(password.trim() == ""){
        res.send("Password required")
        throw new ApiError("Password required")
    }
    const user = await login.findOne(
        {
            $and:[{email:email, source:source}]
        }
    )
    if(user){
        res.send("User already exist")
    }
    else{
        const newuser = login({
            username:username,
            email:email,
            password:password,
            source:source
        })
        await newuser.save()
    res.send(newuser)
    }
    

})

export default register