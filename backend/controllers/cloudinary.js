import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import Apihandler from '../utils/Apihandler.js';
import fs from "fs"
import ListSchema from '../models/listings.js';
cloudinary.config({ 
    cloud_name: 'dmbiqpg0z', 
    api_key: '777934722256838', 
    api_secret: 'rKJu2PhFLImXhA7MswGNp7JP7AI' // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


const imageupload = Apihandler(async(req,res, next)=>{
  console.log(req.body)
    const file = req.files[0]
    const image_url = (await cloudinary.uploader.upload(file.path)).secure_url
    fs.unlinkSync(file.path)
    // console.log(image_url)
    // res.send(image_url)

    req.image_url = image_url

    next()
    
})

const handlelists = Apihandler(async(req,res)=>{
    let image = req.image_url
    const { name, area, price, description} = req.body;
    const newlist = ListSchema({
      name:name,
      area:area,
      price:price,
      image:image,
      description:description
    })
    await newlist.save()
    res.send(newlist)
})

export { upload , imageupload, handlelists}