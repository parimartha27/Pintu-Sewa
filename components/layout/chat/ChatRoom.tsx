import ChatDate from "@/components/fragments/chat/ChatDate";
import ChatFooter from "@/components/fragments/chat/ChatFooter";
import ChatHeader from "@/components/fragments/chat/ChatHeader";
import OthersChatBox from "@/components/fragments/chat/OthersChatBox";
import SelfChatBox from "@/components/fragments/chat/SelfChatBox";

const ChatRoomLayout = () => {
  return (
    <div className="w-full lg:w-3/5 flex flex-col border-l-[1px] border-[#D9D9D9] border-opacity-70">
      <ChatHeader />
      <div className="flex flex-col pt-7 px-6 space-y-6 max-h-[450px] overflow-y-auto hide-scrollbar">
        <ChatDate />
        <OthersChatBox />
        {[1, 2, 3, 4, 5].map((index) => (
          <SelfChatBox key={index} />
        ))}
      </div>
      <ChatFooter />
    </div>
  );
};

export default ChatRoomLayout;
