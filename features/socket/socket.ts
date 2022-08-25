export interface Message{
message:string,
councilId:string,
}

export default function socketMain(socket:any){
    console.log('🔥 A user connected 🙂');

    socket.on('message',(msg:Message)=>{
        console.log(msg)
    })
}