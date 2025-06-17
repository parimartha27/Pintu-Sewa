"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import ContactListShop from "@/components/layout/chat/ContactListShop"
import NoChat from "@/components/fragments/chat/NoChat";
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

  const [shopId, setShopId] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("shopId") : null)
  const { customerId } = useAuth()
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ChatRoomProps | null>(null)

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${chatBaseUrl}/shop/get-roomchat?id=${shopId}`)
      setChatList(Array.isArray(response.data.output_schema) ? response.data.output_schema : [])
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
    const shopId = localStorage.getItem("shopId")
    setShopId(shopId)
    fetchContacts()

    const interval = setInterval(() => {
      fetchContacts();
    }, 2000);

    return () => clearInterval(interval);
  }, [])

  if (loading) return <div className='p-6'>Loading...</div>

  return (
    <SellerLayout>
      <div className='flex w-full min-h-[500px] mb-36 shadow-md'>{chatList.length === 0 ? <NoChat /> : <ContactListShop contacts={chatList} />}</div>
    </SellerLayout>
  )
}

export default ChatSeller
