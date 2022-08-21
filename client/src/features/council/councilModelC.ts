import Joi from "joi";

import { Img, ImgSchema } from "../imgs/imgModelC";
import { Stages } from "./chat/stagesModelC";
import { User } from "../user/userModelC";

export interface Council {
  _id?: string;
  title: string;
  description: string;
  imgs?: Array<Img>;
  stages: Stages[];
  creator?: User;
}

export const CouncilSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  imgs: Joi.array().items(ImgSchema),
  stages: Joi.array().allow(Stages),
});
