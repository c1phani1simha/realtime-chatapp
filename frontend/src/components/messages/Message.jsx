import React from 'react'
import { useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  // console.log(authUser);
  const { selectedConversation } = useConversation();
  // console.log(selectedConversation);
  // console.log("this is sender id", message.senderId);
  console.log("this is authUser id", authUser._id);
  var fromMe = message.senderId === authUser._id;
 
  
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic }
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}>
        { message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center ">
        { formattedTime}
      </div>
    </div>
  );
}

export default Message