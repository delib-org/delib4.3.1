import mongoose from "mongoose";
import Joi from 'joi';

export const ImgSchema = new mongoose.Schema({
    src:String,
    text:String
})

export const ImgSchemaJoi = Joi.object({
    src:Joi.string().required(),
    text:Joi.string()
  });