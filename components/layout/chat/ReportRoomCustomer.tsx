import { useEffect, useState } from "react";
import axios from "axios";
import { chatBaseUrl } from "@/types/globalVar";
import ChatFooter from "@/components/fragments/chat/ChatFooter";
import ChatHeader from "@/components/fragments/chat/ChatHeader";
import OthersChatBox from "@/components/fragments/chat/OthersChatBox";
import SelfChatBox from "@/components/fragments/chat/SelfChatBox";

interface ChatMessage {
  message: string;
  sender_type: string;
  time: string;
  date: string;
}

interface GrupChatMessage {
  date: string;
  messages: ChatMessage[];
}

const ReportRoomCustomer = ({ roomId }: { roomId: string }) => {
  const [chatGroups, setChatGroups] = useState<GrupChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${chatBaseUrl}/view-roomchat/${roomId}`
      );
      setChatGroups(
        Array.isArray(response.data.output_schema)
          ? response.data.output_schema
          : []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roomId || roomId === "null") return;

    const fetchInterval = setInterval(() => {
      fetchMessages();
    }, 1000);

    fetchMessages();

    return () => {
      clearInterval(fetchInterval);
    };
  }, [roomId]);

  return (
    <div className="w-full justify-between lg:w-full flex flex-col border-l-[1px] border-[#D9D9D9] border-opacity-70">
      <div className="flex w-full px-4 py-6 justify-between border-b-[1px] border-[#D9D9D9] border-opacity-70">
        <div className="w-full flex">
          <div className="flex items-center ml-4">
            <h3 className="text-1xl text-[#011627] font-semibold">
              Admin Pintu Sewa
            </h3>
          </div>
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : chatGroups.length === 0 ? (
        <p className="text-center text-gray-400 italic">Tidak ada message</p>
      ) : (
        chatGroups.map((group) => (
          <div
            key={group.date}
            className="flex flex-col pt-7 px-6 space-y-6 max-h-[450px] overflow-y-auto hide-scrollbar"
          >
            <h3 className="text-color-primary text-center">{group.date}</h3>
            {group.messages.map((msg, index) =>
              msg.sender_type.toLowerCase() === "customer" ? (
                <SelfChatBox
                  key={index}
                  message={msg.message}
                  time={msg.time}
                />
              ) : (
                <OthersChatBox
                  key={index}
                  message={msg.message}
                  time={msg.time}
                />
              )
            )}
          </div>
        ))
      )}
      <ChatFooter headerChat={roomId} />
    </div>
  );
};

export default ReportRoomCustomer;
