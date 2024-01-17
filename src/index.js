import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter, postRouter } from "./routes/routes.js";

dotenv.config({ path: "/.env" });

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true, }))

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });

// Your routes
app.get("/", (req, res) => {
    res.send({ message: "Congratulations, your app is working perfectly!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
