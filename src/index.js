// require('dotenv').config({path:'./env'})
import express from "express"
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config({path: "/.env"})

const app = express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
})
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


import  {userRouter, postRouter } from "./routes/routes.js"


app.get("/", (req, res)=>{
res.send({message:"congritulation your app is wroking perfictly"})
})
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter)
