import { socket } from "../../..";
import Joi from "joi";
import { User, UserSchema } from "../../user/userModelC";

const messageSchema = Joi.object({
  message: Joi.string().required(),
  councilId: Joi.string().required(),
  user: UserSchema,
});

export function sendMessage(
  message: string,
  councilId: string,
  user: User | false
) {
  try {
    if (!user) throw new Error("No User");
    const { error } = messageSchema.validate({ message, councilId, user });
    if (error) throw error;
    console.log({ message, councilId });
    socket.emit("message", { message, councilId, user });
  } catch (error) {
    console.error(error);
  }
}
