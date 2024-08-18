import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;
    //trying to find the conversation
    //check if they actually did a conversation previously
   var conversation =  await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
   });
    //if there are making messages for the first time
    if (!conversation) {
      //messages array will also be created, but by default it's values are null 
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    })

    if (newMessage) {
      //pushing the id of the new message to the conversation messages array
      conversation.messages.push(newMessage._id)
    }
    //the saving process of both the models in seperate do take more time

    //so we will use promises to run them parellel
    await Promise.all([conversation.save(), newMessage.save()]);
    
    //we will add also socket.io
    // await conversation.save();
    // await newMessage.save();


    res.status(201).json(newMessage);
  } catch (err) {
    console.log("error in sending the message in the send message controller function",err)
    res.status(500).json({message:"Internal Server error"});
  }
}


export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate("messages");//not references but provides actual messages
    
    if (!conversation) return res.status(200).json([]);
    const msgs = conversation.messages;
    res.status(200).json(msgs);
  } catch (err) {
    console.log(
      "error in sending the message in the send message controller function",
      err
    );
    res.status(500).json({ message: "Internal Server error" });
  }
}