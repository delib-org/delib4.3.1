import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useGetUser,
} from "../../../control/hooks";
import { addMessage } from "./messagesSlice";
import { Council } from "../councilModelC";
import { sendMessage } from "./messagesCont";

import { socket } from "../../../";

interface ChatProps {
  council: Council;
}

const Chat = ({ council }: ChatProps) => {
  const user = useGetUser();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) =>
    state.messages.messages.filter((msg) => msg.councilId === council._id)
  );

  console.log(user);
  useEffect(() => {
    socket.emit("join-room", council._id);

    socket.on("message", (msg) => {
      console.log(msg);
      if (council && council._id && user)
        dispatch(
          addMessage({
            message: msg.message,
            councilId: council._id,
            creator: msg.user,
          })
        );
    });

    return () => {
      socket.emit("leave-room", council._id);
      socket.off("message");
    };
    // eslint-disable-next-line
  }, []);

  function handleSendMessage(ev: any) {
    ev.preventDefault();
    try {
      const message = ev.target.elements.message.value;

      if (user && council && council._id !== undefined) {
        dispatch(addMessage({ message, councilId: council._id, creator: user }));
        sendMessage(message, council._id, user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      {messages.map((msg) => (
        <p key={msg._id}>{msg.message}</p>
      ))}
      <form onSubmit={handleSendMessage}>
        <textarea name="message"></textarea>
        <button>Send</button>
      </form>
    </main>
  );
};

export default Chat;
