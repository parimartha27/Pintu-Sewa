import ContactListCustomer from "./ContactListCustomer"
import NoChat from "@/components/fragments/chat/NoChat"
import { useEffect, useState } from "react"
import axios from "axios"
import { chatBaseUrl } from "@/types/globalVar"
import { useAuth } from "@/hooks/auth/useAuth"

const ChatContentLayout = () => {
  interface ChatItem {
    id: string
    name: string
    image: string
    customer_id: string
    shop_id: string
  }

  const { customerId } = useAuth()
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${chatBaseUrl}/customer/get-roomchat?id=${customerId}`)
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
    fetchContacts()

    const interval = setInterval(() => {
      fetchContacts()
    }, 500)

    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className='p-6 min-h-[500px]'></div>

  return <div className='flex w-full min-h-[500px] mb-36 shadow-md'>{chatList.length === 0 ? <NoChat /> : <ContactListCustomer contacts={chatList} />}</div>
}

export default ChatContentLayout
