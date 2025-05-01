import ContactList from "./ContactList";
import NoChat from "@/components/fragments/chat/NoChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { chatBaseUrl } from "@/types/globalVar";

const ChatContentLayout = () => {
  interface ChatItem {
    id: string;
    name: string;
    image: string;
    customer_id : string;
    shop_id : string;
  }

  const [customerId, setCustomerId] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("customerId") : null);
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${chatBaseUrl}/customer/get-roomchat?id=${customerId}`);
      setChatList(response.data.output_schema)
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setChatList([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    fetchContacts();
  }

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    setCustomerId(customerId);
    fetchContacts();
  
    // const interval = setInterval(() => {
    //   fetchContacts();
    // }, 5000); // polling every 5 seconds
  
    // return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex w-full min-h-[500px] mb-36 shadow-md">
      {chatList.length === 0 ? (
        <NoChat />
      ) : (
        <ContactList contacts={chatList} />
      )}
    </div>
  );
};

export default ChatContentLayout;
