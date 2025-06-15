import mongoose, { Schema } from "mongoose";

const LoginSchema = new Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    source:{
        type:Number
    }
},{
    timestamps:true
}
)
const login = mongoose.model("Users", LoginSchema)

export default login