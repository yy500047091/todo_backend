import express from "express";

import userRouter from"./routes/user.js";
import taskRouter from"./routes/task.js";
import  {config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./controllers/middleware/error.js";
import cors from "cors";


config({
    path: "./data/config.env",
})




export const app = express ();



//using Middlewares


app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: [process.env.FRONTEND_URL],
   methods: ["GET","POST","PUT","DELETE"],
   credeentials :true,
}));

//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);


//using error middleware
app.use(errorMiddleware);

