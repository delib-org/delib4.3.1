import mongoose from "mongoose";
import { CouncilSchema, Stages } from "./councilModel";
import UserModel from "./usersModel";

const NewsItemSchema = new mongoose.Schema({
    creator:{
        type:UserModel,
        required:true
    },
    council:{
        type:CouncilSchema,
        required:true
    },
    CouncilStage:{
        type:String,
        enum:Stages,
        default:Stages.INTRO
    },
    time:{
        type:Date,
        required:true
    }
})

const NewsItemModel = mongoose.model('news',NewsItemSchema);
export default NewsItemModel;