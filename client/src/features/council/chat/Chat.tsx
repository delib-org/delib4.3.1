import {
  useAppDispatch,
  useAppSelector,
  useGetUser,
} from "../../../control/hooks";
import { addMessage } from "./messagesSlice";
import { Council } from "../councilModelC";
import { sendMessage } from "./messagesCont";
import { useEffect } from "react";
import { socket } from "../../../";

interface ChatProps {
  council: Council;
}

const Chat = ({ council }: ChatProps) => {
  const user = useGetUser();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) =>
    state.messages.messages.filter((msg) => msg.council._id === council._id)
  );

  useEffect(() => {
    socket.emit("join-room", council._id);

    socket.on('message',msg=>{
    
      console.log(msg)
    })

    return () => {
      socket.emit("leave-room", council._id);
      socket.off('message');
    };
  }, []);

  function handleSendMessage(ev: any) {
    ev.preventDefault();
    try {
      const message = ev.target.elements.message.value;

      if (user && council && council._id !== undefined)
        dispatch(addMessage({ message, council, creator: user }));
      sendMessage(message, council);
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
