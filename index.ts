import express, { request, response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from "./utils/db";
import authRoutes from './routers/auth.routes.ts'

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use("/api/auth", authRoutes);

connectDb().then(
    () => {
        app.listen(PORT, () => {
            console.log("server running");
        })
    }
)
