import mongoose from "mongoose"
import {Schema} from "mongoose"

const Booking = new Schema({
    user:{
        type:String
    },
    roomid:{
        type:Schema.ObjectId
    },
    price:{
        type:Number
    },
    startdate:{
        type:Date
    },
    enddate:{
        type:Date
    }
})

const BookingSchema = mongoose.model("booking",Booking)

export default BookingSchema