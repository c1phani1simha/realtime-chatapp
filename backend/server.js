import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json()); //to extract the required parameters from the request
//to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser()); //to extract the required parameters like jsonwebtoken for the authorization of the user after their successful login from the cookie from the header that we get

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//middleware for the static files of the frontend application
//like the files of html,images, assets

app.use(express.static(path.join(__dirname, "/frontend/dist")));

//this code will helps us to run the frontend from the backend express server

//this code will help us to run the frontend from the backend express server on the same port of the server i.e., 5000 port
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//basic routes
// app.get("/", (req, res) => {
//   res.send("Hello, World!!");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
