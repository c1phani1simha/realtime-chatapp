import React from 'react'
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';

const Messages = () => {
  const { messages,loading}
    = useGetMessages();
  console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message /> */}
    </div>
  );
}

export default Messages
//basic code for the messages


// import React from 'react'
// import Message from './Message';

// const Messages = () => {
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//     </div>
//   );
// }

// export default Messages