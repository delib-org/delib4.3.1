import mongoose from "mongoose";

export const ImgSchema = new mongoose.Schema({
    src:String,
    text:String
})