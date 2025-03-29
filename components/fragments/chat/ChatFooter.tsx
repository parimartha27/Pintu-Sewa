"use client"

import Image from "next/image";
import Emoji from "@/public/emoji.svg";
import Send from "@/public/sendMessage.svg";
import { useState } from "react";

const ChatFooter = () => {
    
    const [message, setMessage] = useState("");

    const sendMessage = () => {
      if (message.trim() !== "") {
        console.log("Mengirim pesan:", message);
        setMessage("");
      }
    };
  
  return (
    <div className="w-full flex items-center justify-center min-h-[75px] px-6">
      <div className="flex items-center border rounded-md px-4 py-2 w-full shadow-md">
        {/* Icon Smiley */}
        <button className="text-gray-500 hover:text-gray-700">
          <Image className="min-w-3 min-h-3 w-5 h-5" src={Emoji} alt="emoji" />
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Tulis pesanmu di sini..."
          className="flex-1 outline-none px-3 text-sm text-color-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        {/* Send Button */}
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
