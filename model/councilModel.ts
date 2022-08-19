import mongoose from "mongoose";
import Joi from 'joi';

//schemas
import { ImgSchema, ImgSchemaJoi } from "./imgModel";

export enum Stages {
    INTRO = 'intro',
    INFO = 'info',
    VOTES = 'votes',
    OPTIONS = 'options'
}

const CouncilSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imgs:{
        type:[ImgSchema]
    },
    stages:{
        type:[String],
        enum:Stages,
        default:[Stages.INTRO]
    }
})

export const CouncilSchemaJoi = Joi.object({
    title:Joi.string().required(),
    description:Joi.string(),
    imgs:Joi.array().items(ImgSchemaJoi),
    stages:Joi.array().allow(Stages)
})


const CouncilModel = mongoose.model('councils',CouncilSchema);
export default CouncilModel;