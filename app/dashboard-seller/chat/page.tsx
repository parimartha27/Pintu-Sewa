"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import ContactList from "@/components/layout/chat/ContactList"
import ChatRoomLayout from "@/components/layout/chat/ChatRoom"

const ChatSeller = () => {
  return (
    <SellerLayout>
      <div className='flex w-full min-h-[500px] shadow-sm rounded-xl border'>
        <ContactList />
        <ChatRoomLayout />
        {/* jika tidak ada history chat */}
        {/* <NoChat/> */}
        {/* jika tidak ada history chat */}
      </div>
    </SellerLayout>
  )
}

export default ChatSeller
