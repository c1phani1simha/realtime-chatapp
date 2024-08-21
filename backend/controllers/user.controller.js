import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    //returns an array of json objects containing the users
    res.status(200).json(filteredUsers)

  } catch (err) {
    console.log("error in getuserssidebar", err);
    res.status(500).json({error:"Internal Server Error"});
  }
}