import Joi from "joi";

export interface User {
  email_verified: boolean;
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  uid: string;
}

export const UserSchema = Joi.object({
  email_verified: Joi.boolean(),
  email: Joi.string(),
  family_name: Joi.string(),
  given_name: Joi.string(),
  name: Joi.string(),
  picture: Joi.string(),
  uid: Joi.string(),
});
