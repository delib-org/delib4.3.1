import { socket } from "../../..";
import Joi from "joi";
import { Council, CouncilSchema } from "../councilModelC";
import { User, UserSchema } from "../../user/userModelC";

const messageSchema = Joi.object({
  message: Joi.string().required(),
  council: CouncilSchema,
  user:UserSchema
});

export function sendMessage(message: string, council: Council, user:User|false) {
  try {
    if(!user) throw new Error('No User')
    const { error } = messageSchema.validate({ message, council, user });
    if (error) throw error;
    console.log({ message, councilId: council._id})
    socket.emit("message", { message, councilId: council._id, user });
  } catch (error) {
    console.error(error);
  }
}
