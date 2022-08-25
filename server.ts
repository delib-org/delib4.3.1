import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import 'dotenv/config' 
const app = express();
const port: number = 4000;
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

//cont
import socketMain from './features/socket/socket'


app.use(cookieParser());

app.use(express.static("public"));
app.use(express.json());

const mongodb_uri = process.env.MONGODB_URI;

mongoose.connect(
  mongodb_uri
).then(res=>{
  console.log("🔥 Connect to DB 🗄");
}).catch(err=>{
  console.info('At mongoose.connect:')
  console.error(err.message)
});

io.on('connection', socketMain);


import usersRoute from "./features/users/usersRoute";
app.use("/api/users", usersRoute);

import councilsRoute from './features/councils/councilsRoute';
app.use('/api/councils', councilsRoute);






server.listen(port, () => {
  return console.log(`🔥 Server is listening at http://localhost:*${port} ⚡`);
});
