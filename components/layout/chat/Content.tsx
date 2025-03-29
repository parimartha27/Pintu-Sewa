"use client";

import Image from "next/image";
import Product from "@/public/productTest.jpeg";
import optionDots from "@/public/optionDots.svg";
import Ceklist from "@/public/ceklist.svg";
import Emoji from "@/public/emoji.svg";
import Send from "@/public/sendMessage.svg";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Chat from "@/public/chat.svg";
import NoChat from "@/public/noChat.svg";

const ChatContentLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showContacts, setShowContacts] = useState(false);
  const [message, setMessage] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contohTeks =
    "Stoknya masih ada kak, silakan bisa langsung dipesan ya...";
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Mengirim pesan:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full min-h-[500px] mb-36 shadow-md">
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

      {/* Contact List Sidebar */}
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
            <div
              key={index}
              className="flex w-full px-4 py-3 justify-between hover:bg-slate-200 cursor-pointer"
              onClick={() => setShowContacts(false)}
            >
              <div className="w-full flex">
                <Image
                  className="w-14 h-14 rounded-full"
                  src={Product}
                  alt="guest"
                />
                <div className="flex flex-col ml-4">
                  <h3 className="text-base text-color-primary font-semibold">
                    Sewa Buku
                  </h3>
                  <h4 className="text-sm text-color-grayPrimary">
                    {contohTeks.length > 35
                      ? contohTeks.slice(0, 35) + "..."
                      : contohTeks}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col space-y-[6px] min-w-[70px]">
                <h3 className="text-xs text-color-grayPrimary text-end">
                  19:48
                </h3>
                <div className="w-auto min-w-[24px] min-h-[20px] px-2 py-1 bg-color-secondary rounded-full flex items-center justify-center self-end">
                  <h4 className="text-xs text-white text-center">1</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======= RIGHT CONTENT ======= */}

      {/* jika tidak ada history chat */}
      {/* <div className="flex flex-col space-y-6 w-full justify-center items-center">
        <Image className="w-52 h-52" src={NoChat} alt="noChat" />
        <div>
          <h2 className="text-color-primary text-sm max-w-[310px] text-center">
          Kamu belum memiliki
            <span className="font-semibold"> history chat</span>.
          </h2>

          <h2 className="text-color-primary text-sm max-w-[310px]">
            Yuk
            <span className="font-semibold"> mulai chat</span> dengan 
            <span className="font-semibold"> penyedia jasa</span>!
          </h2>
        </div>
      </div> */}
      {/* jika tidak ada history chat */}
      <div className="w-full lg:w-3/5 flex flex-col border-l-[1px] border-[#D9D9D9] border-opacity-70">
        {/* chatHeader */}
        <div className="flex w-full px-4 py-2 justify-between border-b-[1px] border-[#D9D9D9] border-opacity-70">
          <div className="w-full flex">
            <Image
              className="w-12 h-12 rounded-full"
              src={Product}
              alt="product"
            />
            <div className="flex flex-col ml-4">
              <h3 className="text-base text-[#011627] font-semibold">
                Sewa Buku
              </h3>
              <h4 className="text-sm text-color-grayPrimary">
                Dilihat 5 menit lalu
              </h4>
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            {/* Button (Dots Icon) */}
            <div className="flex flex-col justify-center py-3 px-5">
              <Image
                className="w-5 h-5 rounded-full hover:opacity-55 cursor-pointer"
                src={optionDots}
                alt="optionDots"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>

            {/* Popup Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 text-color-primaryDark font-medium hover:bg-color-third cursor-pointer">
                    <Link href="/shop/id">Kunjungi Toko</Link>
                  </li>
                  <li className="px-4 py-2 text-color-primaryDark font-medium hover:bg-color-third cursor-pointer">
                    <Link href="/report">Laporkan</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* chatHeader */}

        {/* chatContent */}
        <div className="flex flex-col pt-7 px-6 space-y-6 max-h-[450px] overflow-y-auto hide-scrollbar">
          <h3 className="text-color-primary text-center">10 Feb 2025</h3>

          {/* otherschat */}
          <div className="flex flex-col space-y-1 bg-color-third rounded-lg px-3 py-2 max-w-[250px] xl:max-w-[400px]">
            <h3 className="text-[#011627]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
              eum tenetur, quis a
            </h3>
            <h4 className="text-xs text-[#011627] text-end">18:12</h4>
          </div>

          {/* otherschat */}

          {/* selfchat */}

          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="flex flex-col self-end space-y-1 bg-color-secondary rounded-lg px-3 py-2 max-w-[250px] xl:max-w-[400px]"
            >
              <h3 className="text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
                eum tenetur
              </h3>
              <div className="flex space-x-1 self-end items-center">
                <h4 className="text-xs text-white text-end">18:12</h4>
                <Image className="w-4 h-4" src={Ceklist} alt="ceklist" />
              </div>
            </div>
          ))}

          {/* selfchat */}
        </div>
        <div className="w-full flex items-center justify-center min-h-[75px] px-6">
          <div className="flex items-center border rounded-md px-4 py-2 w-full shadow-md">
            {/* Icon Smiley */}
            <button className="text-gray-500 hover:text-gray-700">
              <Image
                className="min-w-3 min-h-3 w-5 h-5"
                src={Emoji}
                alt="emoji"
              />
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

        {/* chatContent */}
      </div>

      {/* ======= RIGHT CONTENT ======= */}
    </div>
  );
};

export default ChatContentLayout;
