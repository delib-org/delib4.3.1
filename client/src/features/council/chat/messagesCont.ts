import { socket } from "../../..";
import Joi from "joi";
import { Council, CouncilSchema } from "../councilModelC";

const messageSchema = Joi.object({
  message: Joi.string().required(),
  council: CouncilSchema,
});

export function sendMessage(message: string, council: Council) {
  try {
    const { error } = messageSchema.validate({ message, council });
    if (error) throw error;
    console.log({ message, councilId: council._id })
    socket.emit("message", { message, councilId: council._id });
  } catch (error) {
    console.error(error);
  }
}
