import mongoose, { mongo, Schema } from "mongoose";
import Apihandler from "../utils/Apihandler.js";

const List = new Schema({
    image:{
        type: String
    },
    name:{
        type:String
    },
    area:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    }
},{
    timestamps: true
})

const ListSchema = mongoose.model("lists", List)

export default ListSchema