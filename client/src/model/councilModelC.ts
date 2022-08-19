import Joi, { required } from "joi";

import { Img, ImgSchema} from "./imgModelC";
import { Stages } from "./stagesModelC";

export interface Council{
    title:string;
    description:string;
    imgs?:Array<Img>;
    stages:Stages[];
  }

export const CouncilSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string(),
    imgs:Joi.array().items(ImgSchema),
    stages:Joi.array().allow(Stages)
})

