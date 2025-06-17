"use client"

import Image from "next/image";
import Emoji from "@/public/emoji.svg";
import Send from "@/public/sendMessage.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { chatBaseUrl } from "@/types/globalVar";
import { usePathname } from "next/navigation";

interface ChatFooterProps {
  headerChat: string;
}

const ChatFooter = ({ headerChat }: ChatFooterProps) => {
  const pathname = usePathname();
  const [message, setMessage] = useState<string>("");
  const [sender,setSender] = useState<string>(pathname.startsWith("/dashboard-seller") ? "shop" : "customer");
  
  const sendMessage = async () => {
    if (message.trim() === "") return;
    try {
      const payload = {
        message: message,
        sender_type: sender,
        room_chat_id: headerChat,
      };
      const response = await axios.post(`${chatBaseUrl}/send-message`, payload);
      setMessage(""); 
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
    }
  };
  
  return (
    <div className="w-full flex items-center justify-center min-h-[75px] px-6">
      <div className="flex items-center border rounded-md px-4 py-2 w-full">

        <input
          type="text"
          placeholder="Tulis pesanmu di sini..."
          className="flex-1 outline-none px-3 text-sm text-color-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={sendMessage}
        >
          <Image
            src={Send}
            alt="sendMessage"
            className="min-w-3 min-h-3 w-5 h-5 hover:opacity-75"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;
