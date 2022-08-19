import mongoose from "mongoose";

//schemas
import { ImgSchema } from "./imgModel";

export enum Stages {
    INTRO = 'intro',
    INFO = 'info',
    VOTES = 'options',
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
        type:[Stages],
        enum:Stages,
        default:[Stages.INTRO]
    }
})

const CouncilModel = mongoose.model('councils',CouncilSchema);
export default CouncilModel;