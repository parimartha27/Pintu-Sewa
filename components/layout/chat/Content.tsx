import ContactList from "./ContactList";
import ChatRoomLayout from "./ChatRoom";

const ChatContentLayout = () => {
  return (
    <div className="flex w-full min-h-[500px] mb-36 shadow-md">
      <ContactList/>
      <ChatRoomLayout/>
      {/* jika tidak ada history chat */}
      {/* <NoChat/> */}
      {/* jika tidak ada history chat */}
    </div>
  );
};

export default ChatContentLayout;
