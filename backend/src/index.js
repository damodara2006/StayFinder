import app from "./app.js"
import router from "../route/index.js"
import MONGODB from "../mongodb/index.js"
app.use(router)

await MONGODB()

app.listen(8080,()=>{
    console.log("Server running at :8080")
})
// console.log("Working")