import express from "express"
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser"
const app = express()
const upload = multer()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173","https://stayfinder-4zh4.onrender.com"],
    credentials:true
}))
export default app
