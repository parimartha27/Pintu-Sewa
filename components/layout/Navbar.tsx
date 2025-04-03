"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Toko from "@/public/toko.svg";
import Cart from "@/public/cart.svg";
import Chat from "@/public/chat.svg";
import Guest from "@/public/guest.svg";
import PintuSewa from "@/public/pintuSewa.svg";
import { Button } from "../ui/button";
import FilterSidebar from "./product/FilterSidebar";
import { Skeleton } from "../ui/skeleton";
import optionDots from "@/public/optionDots.svg";

interface NavbarProps {
  type?: string | null;
  token?: string | null;
}

const Navbar = ({ type, token }: NavbarProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);

      if (status === "authenticated") {
        setUsername(session?.user?.name || "Guest");
        setProfileImage(session?.user?.image || Guest);
      }

    
      if (token) {
        const image = localStorage.getItem("image");
        console.log("ada token: " + token);
        console.log("google image: " + image + " guest " + Guest.src);

        setUsername(localStorage.getItem("username") || "Guest");

        if (image) {
          console.log("ada image");
          setProfileImage(image);
        } else {
          console.log("tidak ada image");
          setProfileImage(Guest.src);
        }
      }
    }
  }, [status, session, token]);

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="h-[24px] bg-color-primaryDark w-full"></div>

      <div className="flex h-[70px] lg:h-[70px] shadow-lg bg-white w-full p-2">
        {/* Logo Section */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/6 lg:w-2/12">
          <Link href="/">
            <Image
              src={PintuSewa}
              alt="siap-sewa"
              width={150}
              height={50}
              className="ml-8 lg:ml-8 md:w-[200px] h-[50px] object-contain"
            />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="flex w-11/12 md:w-4/6 lg:w-7/12 p-1.5 items-center justify-center md:ml-10 lg:ml-0">
          <form className="lg:w-11/12 lg:ml-10 w-full h-full">
            <div className="relative h-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="w-full h-full pl-10 pr-4 text-[12px] lg:text-[16px] bg-[#EDEDED] rounded-sm font-jakartaSans text-color-primary focus:ring-1 focus:ring-color-primaryDark focus:border-color-primaryDark outline-none"
                placeholder="Cari barang pengen disewa"
              />
            </div>
          </form>
          <Button className="hidden lg:block ml-3 w-[100px] bg-color-primaryDark hover:bg-blue-900">
            Cari
          </Button>
        </div>

        <div className="flex justify-center md:justify-start lg:justify-center items-center lg:ml-0 lg:mr-0 w-1/5 md:w-2/6 lg:w-3/12">
          {status === "loading" ? (
            <div className="flex items-center gap-4 pr-4">
              <div className="hidden md:flex items-center gap-4">
                <Skeleton className="h-[30px] w-[60px] rounded-full ml-5" />

                <div className="hidden lg:flex items-center gap-2 ml-2">
                  <Skeleton className="h-[40px] w-[5px] rounded-full mr-2" />
                  <Skeleton className="h-[40px] w-[60px] rounded-md" />
                </div>

                <div className="flex gap-2 justify-end">
                  <Skeleton className="h-[40px] w-[80px] rounded-md" />
                  <Skeleton className="h-[40px] w-[80px] rounded-md" />
                </div>
              </div>
            </div>
          ) : session || token ? (
            /* ================== Sudah login ======================= */
            <>
              <div className="flex min-w-[60px] sm:w-2/5 md:w-2/6 md:max-w-[200px] space-x-1 justify-end mt-2 lg:mr-2 md:ml-6 lg:ml-0">
                <Link href="/cart" className="hover:opacity-75 lg:ml-2">
                  <Image
                    src={Cart}
                    alt="cart"
                    width={30}
                    height={30}
                    className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                  />
                </Link>

                {type === "product" ? (
                  <div className="md:mt-1">
                    <FilterSidebar />
                  </div>
                ) : (
                  <Link href="/chat" className="hover:opacity-75 lg:hidden">
                    <Image
                      src={Chat}
                      alt="chat"
                      width={30}
                      height={30}
                      className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                    />
                  </Link>
                )}

                <Link href="/chat" className="hidden lg:block hover:opacity-75">
                  <Image
                    src={Chat}
                    alt="chat"
                    width={30}
                    height={30}
                    className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                  />
                </Link>
              </div>

              <div className="hidden sm:block mx-2 min-h-[30px] min-w-[2px] bg-gray-500 mt-2" />

              <Link
                href="/store"
                className="hidden sm:flex w-2/5 md:w-1/6 space-x-2 mt-1 ml-1 hover:opacity-75 lg:ml-3"
              >
                <Image
                  src={Toko}
                  alt="toko"
                  width={30}
                  height={30}
                  className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                />
                <h4 className="text-xs lg:hidden xl:block lg:text-sm mt-2 font-semibold text-color-primary">
                  Toko
                </h4>
              </Link>

              <div className="hidden lg:flex lg:w-3/6 items-center justify-center mt-2">
                <Link href="/profile" className="lg:ml-5">
                  <Image
                    src={profileImage || Guest.src}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </Link>
                <div className="font-medium dark:text-white w-20">
                  <div className="text-[10px] lg:text-[12px] text-wrap ml-1 line-clamp-2 text-color-primary lg:hidden xl:block">
                    {username}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ================== Belum login ======================= */
            <>
              <div className="flex w-full justify-center">
                {type === "product" ? (
                  <div className="lg:hidden mt-2 lg w-[40px] pl-2">
                    <FilterSidebar />
                  </div>
                ) : (
                  <>
                    {" "}
                    <Image
                      className="md:hidden min-w-[5px] hover:opacity-75 cursor-pointer"
                      src={optionDots}
                      alt="optionDots"
                      width={5}
                      height={5}
                      onClick={() => setOpen(!open)} // Toggle popup
                    />
                    {/* Popup Menu */}
                    {open && (
                      <div
                        ref={popupRef}
                        className="absolute top-10 right-5 w-40 bg-white shadow-lg rounded-md z-10"
                      >
                        <button
                          className="block w-full text-color-primaryDark text-left p-2 hover:bg-color-third"
                          onClick={() => router.push("/login")}
                        >
                          Login
                        </button>
                        <button
                          className="block w-full text-left text-color-primaryDark p-2 hover:bg-color-third"
                          onClick={() => router.push("/register")}
                        >
                          Register
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="hidden md:flex w-11/12 justify-center space-x-1 md:space-x-7 mr-1 xl:mr-10">
                <Link
                  href={"/cart"}
                  className="hidden md:flex lg:w-[30px] lg:h-[30px] justify-center items-center mt-1 ml-1 hover:opacity-75"
                >
                  <Image className="min-w-[30px]" src={Cart} alt="cart" />
                </Link>
                <div className="hidden align-self-center md:block h-[40px] min-w-[2px] bg-gray-500">
                  {" "}
                </div>
                <div className="w-7/12 flex space-x-3 md:mt-1 lg:mt-0">
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-1/2 xl:w-[150px] max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[40px]  text-[10px] lg:text-[14px] rounded-sm bg-white text-color-primary outline-none border-2 border-color-primaryDark hover:bg-slate-200"
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={() => router.push("/register")}
                    className="w-1/2 xl:w-[150px] max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[40px]  text-[10px] lg:text-[14px] rounded-sm bg-custom-gradient-tr hover:bg-blue-900"
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
