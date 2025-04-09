import express from 'express';
import {PORT} from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscriptions.routes.js";
import {connectToDatabase} from "./database/dbconnect.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import {arcjectMiddleware} from "./middlewares/arcject.middleware.js";
import cors from "cors";
import workflowsRouter from "./routes/workflows.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"))
// app.use(arcjectMiddleware)

app.use(cors({
    origin: "*", // Allow all (for testing only)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.options('*', cors())

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/workflows",workflowsRouter)

app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("Welcome to Subscriptions tracker App")
})

app.listen(PORT, async ()=>{
    console.log(`Subscriptions listening on port http://localhost:${PORT}`)
    await connectToDatabase()
})

export default app;