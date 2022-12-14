import mongoose from "mongoose";
import Joi from 'joi';

//schemas
import { ImgSchema, ImgSchemaJoi } from "../imgs/imgModel";
import { UserSchema } from "../../client/src/features/user/userModelC";
import { UserSchemaJoi } from "../users/usersModel";

export enum Stages {
    INTRO = 'intro',
    INFO = 'info',
    VOTES = 'votes',
    OPTIONS = 'options'
}

export const CouncilSchema = new mongoose.Schema({
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
    },
    creator:{
        type:UserSchema,
        required:true
    }
})

export const CouncilSchemaJoi = Joi.object({
    title:Joi.string().required(),
    description:Joi.string(),
    imgs:Joi.array().items(ImgSchemaJoi),
    stages:Joi.array().allow(Stages),
    creator:UserSchemaJoi
})


const CouncilModel = mongoose.model('councils',CouncilSchema);
export default CouncilModel;