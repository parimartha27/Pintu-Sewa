"use client"

import ContactCard from "@/components/fragments/chat/ContactCard";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Chat from "@/public/chat.svg";

const ContactList = () => {
  const [showContacts, setShowContacts] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowContacts(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setShowContacts((prev) => !prev);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg border-[1px] border-[#D9D9D9] border-opacity-65 hover:bg-color-third transition-colors"
      >
        {showContacts ? (
          <Image className="w-8 h-8" src={Chat} alt="profile" />
        ) : (
          <Image className="w-8 h-8" src={Chat} alt="profile" />
        )}
      </button>
      <div
        ref={sidebarRef}
        className={`lg:w-2/5 flex flex-col justify-center space-y-3  bg-white fixed lg:static top-10 left-0 h-full z-40 lg:z-auto transform transition-transform duration-300 ${
          showContacts
            ? "translate-x-0 "
            : " -translate-x-full lg:translate-x-0"
        }`}
        style={{ width: "80%", maxWidth: "400px" }}
      >
        <h2 className="text-2xl lg:text-[28px] text-color-primary font-semibold pl-4 lg:pl-6">
          Chat Penyedia Jasa
        </h2>

        <div className="flex flex-col max-h-[480px] overflow-y-auto thin-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <ContactCard key={index} setShowContacts={setShowContacts} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactList;
