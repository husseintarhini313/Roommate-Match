import db from "./config/db.js";
import userRouter from "./features/auth/auth.router.js"; 
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import profileRouter from "./features/profile/profile.router.js";

await db;


const app= express();
const Port= process.env.PORT || 3000;

app.use(cors({
    origin:"http://localhost:5173"
}));

app.use(express.json());


app.use('/api/auth', userRouter);
app.use('/api/profile', profileRouter);


app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
});

app.use(errorHandler);