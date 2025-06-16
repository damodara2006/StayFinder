import ListSchema from "../models/listings.js";
import Apihandler from "../utils/Apihandler.js";

const listingdata = Apihandler(async(req,res)=>{
    const data = await ListSchema.find()
    console.log(data)
    res.send(data)
})

const updatelike = Apihandler(async(req,res)=>{
    let{id,data} = req.params
    console.log(id)
    let bool;
    if(data == "true"){
        bool = true
    }
    else{
        bool = false
    }
    console.log(typeof data)
    const item = await ListSchema.updateOne({_id:id},{liked:!bool})
    console.log(item)
    res.send("Done")
})

export  {listingdata,updatelike}