import {io} from '../../server';

export interface Message {
  message: string;
  councilId: string;
}

export default function socketMain(socket: any) {
  console.log("🔥 A user connected 🙂");

  socket.on("message", (msg: Message) => {
    console.log('sending message')
    console.log(msg);
    socket.broadcast.to(msg.councilId).emit('message',msg);
  });

  socket.on("join-room", (roomId: string) => {
    if (typeof roomId === "string") {
      console.log("join room");
      socket.join(roomId);
    }
  });

  socket.on("leave-room", (roomId: string) => {
    if (typeof roomId === "string") {
      console.log("leave room");
      socket.leave(roomId);
    }
  });
}
