import app from "./app.js"
import router from "../route/index.js"
import MONGODB from "../mongodb/index.js"
app.use(router)

await MONGODB()
let PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server running at :${PORT}`)
})
// console.log("Working")