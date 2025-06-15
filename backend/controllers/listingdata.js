import ListSchema from "../models/listings.js";
import Apihandler from "../utils/Apihandler.js";

const listingdata = Apihandler(async(req,res)=>{
    const data = await ListSchema.find()
    console.log(data)
    res.send(data)
})

export default listingdata