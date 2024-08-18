import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmedPassword, gender } =
      req.body;

    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //https://avatar.iran.liara.run/public/boy
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password:hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      //generate jwt token
      generateTokenSetCookie(newUser._id,res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({error:"Invalid User Data"});
   }
   
  } catch (err) {
    console.log("error in auth.controllers, signup function",err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
     const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,user?.password || ""
    );
    
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or credentials" });
    }

    generateTokenSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePicture: user.profilePicture,
     });
   
  } catch (err) {
    console.log("error in auth.controllers.login function", err);
    res.status(500).json({ error: "Internal Server Error" });
 
   }
};

export const logout =  (req, res) => {
  try {
    //clear al this cookies
    //"jwt"->name of the cookie setting it's value to null -> ""
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: 'Logged Out successfully' });
  } catch (err) {
    console.log("error in auth.controllers.logout function", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
