import express from 'express';
import {PORT} from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscriptions.routes.js";
import {connectToDatabase} from "./database/dbconnect.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"))

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)

app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("Welcome to Subscriptions tracker App")
})

app.listen(PORT, async ()=>{
    console.log(`Subscriptions listening on port http://localhost:${PORT}`)
    await connectToDatabase()
})

export default app;