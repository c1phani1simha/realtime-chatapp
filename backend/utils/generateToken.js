import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenSetCookie = (userId, res) => {
  //this token will also expires in the 15 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' })

  //maxAge is for the cookie expiry
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure:process.env.NODE_ENV!=="development",
    //prevent XSS attacks cross-site scripting attacks
    sameSite:"strict",//CSRF attacks cross-site request forgery attacks
  })
}

export default generateTokenSetCookie;