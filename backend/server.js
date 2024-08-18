import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5500;

dotenv.config();

//middlewares
app.use(express.json());//to extract the required parameters from the request
//to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());//to extract the required parameters like jsonwebtoken for the authorization of the user after their successful login from the cookie from the header that we get

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//basic routes
// app.get("/", (req, res) => {
//   res.send("Hello, World!!");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
 