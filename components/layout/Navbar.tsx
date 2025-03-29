"use client";

import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
import Link from "next/link";
import Google from "@/public/google.jpg";
import Toko from "@/public/toko.svg";
import Cart from "@/public/cart.svg";
import Chat from "@/public/chat.svg";
import PintuSewa from "@/public/pintuSewa.svg";
import { Button } from "../ui/button";
import FilterSidebar from "./product/FilterSidebar";
import { useRouter } from "next/navigation";

// Breakpoint prefix	Minimum width	CSS
// sm	40rem (640px)	@media (width >= 40rem) { ... }
// md	48rem (768px)	@media (width >= 48rem) { ... }
// lg	64rem (1024px)	@media (width >= 64rem) { ... }
// xl	80rem (1280px)	@media (width >= 80rem) { ... }
// 2xl	96rem (1536px)	@media (width >= 96rem) { ... }

interface NavbarProps {
  type?: string;
}

const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();

   // const handleSignOut = async () => {
  //   await signOut({callbackUrl: "/login" });

  //   localStorage.clear();
  //   sessionStorage.clear();

  // };

  //=============== Navbar Servcice ===================

  // const sessionCredential: string = localStorage.getItem("session") || "";
  // const username: string = localStorage.getItem("username") || "";
  // const { data: session } = useSession();

  //=============== Navbar Servcice ===================

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="h-[24px] bg-color-primaryDark w-full"></div>
      <div className="flex h-[70px] lg:h-[70px] shadow-lg bg-white w-full p-2">
        <div className="hidden md:flex flex-col items-center justify-center w-1/6 lg:w-2/12 ">
          <Image
            src={PintuSewa}
            alt="siap-sewa"
            className="min-w-[150px] ml-8 lg:ml-8 md:w-[200px] h-[120px]"
          />
        </div>

        <div className="flex w-4/5 md:w-4/6 lg:w-7/12 p-1.5 items-center justify-center md:ml-10 lg:ml-0">
          <form className="lg:w-11/12 lg:ml-10 w-full h-full ">
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
          {/* ================== KALAU BELUM LOGIN ======================= */}

          {/* <div className="flex w-full justify-center">
            {type === "product" ? (
              <div className="lg:hidden mt-2 lg w-[40px] pl-2"><FilterSidebar/></div>
              
            ) : (
              <Button className="md:hidden w-full max-w-[80px] mr-2 text-[12px] h-[35px] text-white bg-color-primaryDark">
                Cari
              </Button>
            )}
          </div>
          <div className="hidden md:flex w-11/12 justify-center space-x-1 md:space-x-7 mr-1 xl:mr-10">
            
            <Link
              href={"/cart"}
              className="hidden md:flex lg:w-[30px] lg:h-[30px] justify-center items-center mt-1 ml-1 hover:bg-color-third"
            >
              <Image
                className="min-w-[30px]"
                src={Cart}
                alt="cart"
              />
            </Link>
            <div className="hidden align-self-center md:block h-[40px] min-w-[2px] bg-gray-500">
              {" "}
            </div>
            <div className="w-7/12 flex space-x-3 md:mt-1 lg:mt-0">
              {" "}
              <Button onClick={() => router.push("/login")} className="w-1/2 xl:w-[150px] max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[40px]  text-[10px] lg:text-[14px] rounded-sm bg-white text-color-primary outline-none border-2 border-color-primaryDark hover:bg-slate-200">
                Masuk
              </Button>
              <Button onClick={() => router.push("/register")} className="w-1/2 xl:w-[150px] max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[40px]  text-[10px] lg:text-[14px] rounded-sm bg-custom-gradient-tr hover:bg-blue-900">
                Daftar
              </Button>
            </div>
          </div> */}

          {/* ================== KALAU BELUM LOGIN ======================= */}

          {/* ================== KALAU SUDAH LOGIN ======================= */}

          <div className="flex min-w-[60px] sm:w-2/5 md:w-2/6 md:max-w-[200px] space-x-1 justify-end mt-2 lg:mr-2 md:ml-6 lg:ml-0">
            <Link href={"/cart"} className="hover:bg-color-third lg:ml-2">
              <Image
                className="w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] md:w-[30px] md:h-[30px]"
                src={Cart}
                alt="cart"
              />
            </Link>

            {type == "product" ? (
              <div className="md:mt-1">
                <FilterSidebar />
              </div>
            ) : (
              <Link href={"/chat"} className="hover:bg-color-third lg:hidden">
                <Image
                  className="w-[25px] h-[25px]  md:w-[30px] md:h-[30px]"
                  src={Chat}
                  alt="chat"
                />
              </Link>
            )}

            <Link href={"/chat"} className="hidden lg:block hover:bg-color-third">
              <Image
                className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]  md:w-[30px] md:h-[30px]"
                src={Chat}
                alt="chat"
              />
            </Link>
          </div>
          <div className="hidden sm:block mx-2 min-h-[30px] min-w-[2px] bg-gray-500 mt-2">
          </div>
          <Link
            href={""}
            className="hidden sm:flex w-2/5 md:w-1/6 space-x-2 mt-1 ml-1 hover:bg-color-third lg:ml-3"
          >
            <Image
              className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]  md:w-[30px] md:h-[30px]"
              src={Toko}
              alt="toko"
            />
            <h4 className="text-xs lg:hidden xl:block lg:text-sm mt-2 font-semibold text-color-primary">
              Toko
            </h4>
          </Link>
          <div className="hidden lg:flex lg:w-3/6  items-center justify-center mt-2 ">
            <Link href={"/profile"} className="lg:ml-5">
              <Image
                className="w-3/5 h-3/5 rounded-full xl:w-10 xl:h-10"
                src={Google}
                alt=""
              />
            </Link>

            <div className="font-medium dark:text-white w-20">
              <div className="text-[10px] lg:text-[12px] text-wrap ml-1 line-clamp-2 text-color-primary lg:hidden xl:block">
                Steven Matthew
              </div>
            </div>
          </div>

          {/* ================== KALAU SUDAH LOGIN ======================= */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
