import {
  useAppDispatch,
  useAppSelector,
  useGetUser,
} from "../../../control/hooks";
import { addMessage } from "./messagesSlice";
import { Council } from "../councilModelC";
interface ChatProps {
  council: Council;
}

const Chat = ({ council }: ChatProps) => {
  const user = useGetUser();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) =>
    state.messages.messages.filter((msg) => msg.council._id === council._id)
  );

  function handleSendMessage(ev: any) {
    ev.preventDefault();
    try {
      const message = ev.target.elements.message.value;
      console.log(message);
      if (user && council)
        dispatch(addMessage({ message, council, creator: user }));
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
