 import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods:["GET","POST"]
  }
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {};//userId:socketId

//whenever the connections gets established it means a user gets connected there

io.on("connection", (socket) => { 
  console.log("a user connected with id", socket.id);
  
  const userId = socket.handshake.query.userId;
  if(userId!=="undefined"){
    userSocketMap[userId] = socket.id;
  }
   //this helps us to send the events to all connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  //socket.on() is used to listen to the event that is being emitted from the client side and server side both
  socket.on("disconnect", () => {
    console.log("user disconnected with id", socket.id);
    delete userSocketMap[userId];
    //this helps us to send the events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
 
export {app,io,server }