import { Router } from "express";
import sample from "../controllers/index.js";
import {loginuser, cookie} from "../controllers/login.js";
import register from "../controllers/register.js";
import { upload, imageupload, handlelists} from "../controllers/cloudinary.js"
import listingdata from "../controllers/listingdata.js";
const router = Router()

router.route("/").get(sample)
router.route("/login").post(loginuser)
router.route("/register").post(register)
router.route("/cookie").post(cookie)
router.route("/upload").post(upload.any(), imageupload, handlelists);
router.route("/listing").get(listingdata)
export default router