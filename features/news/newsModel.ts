import mongoose from "mongoose";

import { CouncilSchema, Stages } from "../councils/councilModel";
import UserModel, { UserSchema } from "../users/usersModel";

const NewsItemSchema = new mongoose.Schema({
    creator:{
        type:UserSchema,
        required:true
    },
    council:{
        type:CouncilSchema,
        required:true
    },
    councilStage:{
        type:String,
        enum:Stages,
        default:Stages.INTRO
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    }
})

const NewsItemModel = mongoose.model('news',NewsItemSchema);
export default NewsItemModel;