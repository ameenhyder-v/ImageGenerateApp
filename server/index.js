import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})


app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);


// connect with mongodb
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("MongoDB Connected"))
            .catch((err) => {
                console.log("Faild to connect to DB");
                console.error(err);
            });
};


app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
})

const startServer = async () => {
    try {
        connectDB();
        app.listen(8001, () => console.log("sever is running on 8001"));
    } catch (error) {
        console.error(error);
    }
}

startServer();

