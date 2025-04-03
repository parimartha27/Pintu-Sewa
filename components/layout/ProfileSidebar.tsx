"use client";

import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import Profile from "@/public/profile.svg";
import Pesanan from "@/public/pesanan.svg";
import Logout from "@/public/logout.svg";
import Dots from "@/public/dots.png";
import Chat from "@/public/chat.svg";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

const ProfileSidebarLayout = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut({callbackUrl: "/login" });

    localStorage.clear();
    sessionStorage.clear();
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));

  };

  return (
    <div className="flex flex-col w-1/4 max-w-[60px] md:max-w-[280px] h-auto max-h-[190px]">
      <Button
        variant="ghost"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden z-20 p-2 mx-auto hover:bg-color-third md:mx-8 flex flex-col my-3 group w-15 h-full"
      >
        <Image src={Dots} alt="dots" className="w-5 h-5" />
        <h4 className="text-[12px] text-color-primary text-center group-hover:text-color-primaryDark">
          Lainnya
        </h4>
      </Button>

      {/* Overlay untuk mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Accordion/Sidebar */}
      <div
        className={`fixed md:static -m-1 md:w-full z-50 md:z-auto w-2/4 max-w-[280px] h-screen md:h-auto bg-white shadow-md md:shadow-none transform transition-transform duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col w-full h-auto max-h-[300px]">
          <div className="flex flex-col mt-4">
            <Accordion type="single" collapsible className="h-auto shadow-md ">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="pl-5 pt-7 pr-5">
                  <div className="flex space-x-2">
                    <Image
                      src={Profile}
                      alt="profile"
                      width={16.5}
                      height={17.26}
                    />
                    <h4 className="text-[#2C3941] text-xs lg:text-sm font-medium">
                      Akun Saya
                    </h4>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="w-full">
                  <Link
                    href={"/profile"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <h4 className="pl-8 py-1.5 text-[#2C3941] text-[10px] lg:text-[12px] font-medium hover:bg-color-third hover:text-color-primaryDark">
                      Edit Profile
                    </h4>
                  </Link>
                  <Link
                    href={"/reset-password"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <h4 className="pl-8 py-1.5 text-[#2C3941] text-[10px] lg:text-[12px] font-medium hover:bg-color-third hover:text-color-primaryDark">
                      Ubah Password
                    </h4>
                  </Link>
                </AccordionContent>
                <Link
                  href={"/order-history"}
                  className="group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="pl-5 pr-2 pb-3">
                    <div className="flex space-x-2">
                      <Image
                        src={Pesanan}
                        alt="profile"
                        width={15}
                        height={20}
                      />
                      <h4 className="text-[#2C3941] text-xs lg:text-sm font-medium group-hover:underline">
                        Pesanan Saya
                      </h4>
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/chat"}
                  className="group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="pl-3.5 pr-2 pb-3">
                    <div className="flex items-center space-x-1">
                      <Image src={Chat} alt="profile" width={30} height={30} />
                      <h4 className="text-[#2C3941] text-xs lg:text-sm font-medium group-hover:underline">
                        Chat
                      </h4>
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/profile"}
                  className="group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="pl-5 pr-2 pb-6">
                    <div className="flex space-x-2">
                      <Image
                        src={Logout}
                        alt="profile"
                        width={18}
                        height={20}
                      />
                      <h4 onClick={handleSignOut} className="text-[#2C3941] text-xs lg:text-sm font-medium group-hover:underline">
                        Logout
                      </h4>
                    </div>
                  </div>
                </Link>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebarLayout;
