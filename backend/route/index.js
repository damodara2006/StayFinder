import { Router } from "express";
import sample from "../controllers/index.js";
import {loginuser, cookie, finduser} from "../controllers/login.js";
import register from "../controllers/register.js";
import { upload, imageupload, handlelists} from "../controllers/cloudinary.js"
import  { listingdata, updatelike } from "../controllers/listingdata.js";
import {book, getbooking} from "../controllers/booking.js"
const router = Router()

router.route("/").get(sample)
router.route("/login").post(loginuser)
router.route("/register").post(register)
router.route("/cookie").post(cookie)
router.route("/upload").post(upload.any(), imageupload, handlelists);
router.route("/listing").get(listingdata)
router.route("/updatelike/:id/:data").post(updatelike)
router.route("/finduser").get(finduser)
router.route("/book").post(book)
router.route("/getbooking").get(getbooking)

export default router