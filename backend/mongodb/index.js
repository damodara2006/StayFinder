import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({
    path:".env"
})
const MONGODB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.mongodb)
        console.log("DB connected")
    }
    catch(e){
        console.log(e)
        process.exit(1)
    }
}

export default MONGODB