"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import ContactList from "@/components/layout/chat/ContactList"
import ChatRoomLayout from "@/components/layout/chat/ChatRoom"
import { useEffect, useState } from "react"
import axios from "axios"
import { chatBaseUrl } from "@/types/globalVar"
import { useAuth } from "@/hooks/auth/useAuth"

const ChatSeller = () => {
  interface ChatRoomProps {
    item: ChatItem
  }
  interface ChatItem {
    id: string
    name: string
    image: string
    customer_id: string
    shop_id: string
  }

  const {customerId} = useAuth();
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ChatRoomProps | null>(null)

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${chatBaseUrl}/customer/get-roomchat?id=${customerId}`)
      setChatList(response.data.output_schema)
    } catch (error) {
      console.error("Error fetching contacts:", error)
      setChatList([])
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    fetchContacts()
  }

  useEffect(() => {
    fetchContacts()

    // const interval = setInterval(() => {
    //   fetchContacts();
    // }, 5000); // polling every 5 seconds

    // return () => clearInterval(interval);
  }, [])

  if (loading) return <div className='p-6'>Loading...</div>

  return (
    <SellerLayout>
      <div className='flex w-full min-h-[500px] shadow-sm rounded-xl border'>
        <ContactList contacts={chatList} />
        {/* <ChatRoomLayout item={selectedItem} /> */}
        {/* jika tidak ada history chat */}
        {/* <NoChat/> */}
        {/* jika tidak ada history chat */}
      </div>
    </SellerLayout>
  )
}

export default ChatSeller
