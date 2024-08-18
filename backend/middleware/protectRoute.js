import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.config();
//middleware to authorize the user

const protectRoute =async (req, res, next) => { 
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({message:"there is no token, please do login first"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({message:"Invalid token, please do login first"})
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({message:"User not found, please do login first"})
    }
    //here we are adding the user/sender/current one to the next route, i.e., message.controller.js
    //in the request parameters
    req.user = user;

    next();
  } catch (err) {
    console.log("error in protect route middle ware function", err);
    res.status(500).json({message:"Internal Server error"});
  }
}

export default protectRoute;