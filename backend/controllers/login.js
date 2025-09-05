import ApiError from "../utils/ApiError.js";
import Apihandler from "../utils/Apihandler.js";
import login from "../models/login.js";
import cookies from "cookie-parser"
import jwt from "jsonwebtoken"
const loginuser = Apihandler(async(req,res)=>{
    const {email, password, source, username} = req.body;
    // console.log(password)
    if(source == 1){
        if(email.trim() == ""){
            res.send("Email required")
        }
        if(!email.includes("@")){
            res.send("Email incorrect")
        }
        if(password.trim() == ""){
            res.send("Password required")
        }
        else{
            const user = await login.findOne(
                {
                    $and:[{email:email, source:source}]
                }
            )
            // console.log(user)

            if(user){
                if(user.password == password){
                    res.send(user)
                }else{
                    res.send("Password incorrect")
                }
            }
            else{
                res.send("No account found")
            }
        }
    }
    
    
    if(source == 2){
        const user = await login.findOne(
            {
                $and:[{email:email, source:source}]
            }
        )
        if(user){
            res.send(user)
        }
        else{
            const newuser = await login({
                username:username,
                email:email,
                source:source
            })
            await newuser.save()
            res.send(newuser)
        }
    }
})

const cookie = Apihandler(async(req,res)=>{
    const {email} = req.body;
    const value = jwt.sign({email}, "json-web-token")
    res.cookie("Login", value, {
        sameSite:"none",
        secure:true,
        httpOny:true,
        maxAge:600000})
    // console.log("Done")
    res.send("Done")  
})

const finduser = Apihandler(async(req,res)=>{
    
    let cook = req.cookies.Login
    if(cook){
        let data = jwt.verify(cook,"json-web-token")
    // console.log(data)
    res.send(data.email)
    }
})
export { loginuser, cookie,finduser}