import express, { request, response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from "./utils/db";


const app = express();
const PORT = process.env.PORT;

connectDb().then(
    () => {
        app.listen(4000, () => {
            console.log("server running");
        })
    }
)
