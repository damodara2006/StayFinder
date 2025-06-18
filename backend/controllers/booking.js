import Apihandler from "../utils/Apihandler.js"
import BookingSchema from "../models/booking.js";
import ListSchema from "../models/listings.js";
// import Item from "../../frontend/src/Pages/Item.jsx";
const book = Apihandler(async(req,res)=>{
    const { user, roomid, price, startdate, enddate} = req.body;
    // console.log(user)
    if(user == undefined){
        res.send("Please login")
    }
    if(price == 0){
        // console.log("Price fault")
        res.send("Choose atleast on quantity")
    }
    if(user && price !=0){
    const newbooking = BookingSchema({
        user:user,
        roomid:roomid,
        price:price,
        startdate:startdate,
        enddate:enddate
    })
    await newbooking.save()
    // console.log(newbooking)
    res.send(newbooking)
}
})

const getbooking = Apihandler(async(req,res)=>{
    // console.log("hello")
    let data = await BookingSchema.find()
    // console.log(data)
    let items = [];
    let realdata = []
    data.forEach((item)=>{
        items.push({user: item.user, room:item.roomid, price :item.price, start:item.startdate,end:item.enddate})
    })
    for (let index = 0; index < items.length; index++) {
        let img = await ListSchema.findById(items[index].room)
        // console.log(data)
        let image = img.image
        realdata.push({user: data[index].user, room:image, price :data[index].price, start:data[index].startdate,end:data[index].enddate})
    }
    res.send(realdata)
})

export  {book, getbooking}