import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import { query } from "express";

const SocketContext = createContext();


export const useSocketContext = () => {
  return useContext(SocketContext);
}
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      const socket = io("https://localhost:5000",{query: {userId:authUser._id}});

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  
  return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
}
