import Joi from "joi";

export interface Img{
    src:string,
    text:string,
  }

  export const ImgSchema = Joi.object({
    src:Joi.string().required(),
    text:Joi.string()
  })