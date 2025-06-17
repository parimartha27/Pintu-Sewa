import { useEffect, useState } from "react"
import axios from "axios"
import { chatBaseUrl } from "@/types/globalVar"
import ChatFooter from "@/components/fragments/chat/ChatFooter"
import ChatHeader from "@/components/fragments/chat/ChatHeader"
import OthersChatBox from "@/components/fragments/chat/OthersChatBox"
import SelfChatBox from "@/components/fragments/chat/SelfChatBox"

interface ChatItem {
  id: string
  name: string
  image: string
  customer_id: string
  shop_id: string
}

interface ChatMessage {
  message: string
  sender_type: string
  time: string
  date: string
}

interface GrupChatMessage {
  date: string
  messages: ChatMessage[]
}

interface ChatRoomProps {
  item: ChatItem
}

const ChatRoomLayout = ({ item }: ChatRoomProps) => {
  const [chatGroups, setChatGroups] = useState<GrupChatMessage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${chatBaseUrl}/view-roomchat/${item.id}`)
      setChatGroups(Array.isArray(response.data.output_schema) ? response.data.output_schema : [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(() => {
      fetchMessages()
    }, 500) // polling every 5 seconds

    return () => clearInterval(interval)
  }, [item.id])

  return (
    <div className='w-full justify-between lg:w-full flex flex-col border-l-[1px] border-[#D9D9D9] border-opacity-70'>
      <ChatHeader detailHeader={item} />
      {loading ? (
        <p className='text-center text-gray-500'>Loading messages...</p>
      ) : chatGroups.length === 0 ? (
        <p className='text-center text-gray-400 italic'>Tidak ada message</p>
      ) : (
        chatGroups.map((group) => (
          <div
            key={group.date}
            className='flex flex-col pt-7 px-6 space-y-6 max-h-[450px] overflow-y-auto hide-scrollbar'
          >
            <h3 className='text-color-primary text-center'>{group.date}</h3>
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
      <ChatFooter headerChat={item.id} />
    </div>
  )
}

export default ChatRoomLayout
