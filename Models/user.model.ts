import mongoose from "mongoose";
import * as z from "zod";

export const signup = new mongoose.Schema({
    name : String,
    email : String
})