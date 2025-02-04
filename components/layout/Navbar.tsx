import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Toko from "../../public/toko.svg";
import Cart from "../../public/cart.svg";
import Chat from "../../public/chat.svg";
import Line from "../../public/line.svg";
import { Button } from "../ui/button";

// Breakpoint prefix	Minimum width	CSS
// sm	40rem (640px)	@media (width >= 40rem) { ... }
// md	48rem (768px)	@media (width >= 48rem) { ... }
// lg	64rem (1024px)	@media (width >= 64rem) { ... }
// xl	80rem (1280px)	@media (width >= 80rem) { ... }
// 2xl	96rem (1536px)	@media (width >= 96rem) { ... }

// ======NAVBAR=====

// mobile: searchbar 3/5, sisanya 2/5
// md: logo 1/4 sisa 3/4(searchbar dan button search 3/4 sisanya 1/4), sudah ada carousel catalog, categori dan judulnya sudah ada, pindah kebawah carousel catalog kasih padding page untuk kiri kanan, 1/2 dari padding lg dan padding atas tetap

// lg: 3/4(logo 1/4 searchbar 3/4) sisanya 1/4

const Navbar = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="h-[24px] bg-color-primaryDark w-full"></div>
      <div className="flex h-[70px] lg:h-[70px] shadow-lg bg-white w-full p-2">
        <div className="hidden md:flex flex-col items-center justify-center w-1/6 lg:w-2/12 ">
          <span className="text-black font-semibold text-3xl">SIAP SEWA</span>
        </div>

        <div className="flex w-4/5 md:w-3/6 lg:w-7/12 p-1.5 items-center justify-center">
          <form className="lg:w-11/12 w-full h-full">
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
                className="w-full h-full pl-10 pr-4 text-[12px] lg:text-[16px] bg-[#EDEDED] rounded-sm text-color-grayPrimary "
                placeholder="Cari barang pengen disewa"
                required
              />
            </div>
          </form>
          <Button className="hidden lg:block ml-3 w-1/12 bg-color-primaryDark hover:opacity-80">
            Cari
          </Button>
        </div>

        {/* ================== KALAU BELUM LOGIN ======================= */}

        <div className="flex justify-center items-center w-1/5 md:w-2/6 lg:w-3/12">
          <div className="flex w-full sm:hidden justify-center">
            <Button className="w-full max-w-[80px] mr-2 text-[12px] h-[35px] text-white bg-color-primaryDark">
              Cari
            </Button>
          </div>
          <div className="hidden sm:flex w-11/12 justify-center space-x-1 md:space-x-5 mr-1 lg:ml-10">
            <Link
              href={""}
              className="hidden md:flex lg:w-2/12 justify-center items-center  hover:bg-slate-200"
            >
              <Image
                className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] md:w-[30px] md:h-[30px]"
                src={Cart}
                alt="cart"
              />
            </Link>
            <div className="hidden align-self-center md:block h-[30px] w-[2px] bg-gray-500">
              {" "}
            </div>
            <div className="w-full flex space-x-3 pl-5">
              {" "}
              <Button className="w-1/2 max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[35px]  text-[10px] lg:text-[12px]  rounded-sm bg-white text-color-primary outline-none border-2 border-color-primaryDark hover:bg-slate-200">
                Masuk
              </Button>
              <Button className="w-1/2 max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[35px]  text-[10px] lg:text-[12px] rounded-sm bg-custom-gradient-tr hover:opacity-80">
                Daftar
              </Button>
            </div>
          </div>

          {/* ================== KALAU SUDAH LOGIN ======================= */}

          {/* <div className="flex w-full sm:w-2/5 md:w-2/6 md:max-w-[100px] space-x-2 justify-start md:justify-center">
            <Link href={""} className="hover:bg-slate-200">
              <Image
                className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] md:w-[30px] md:h-[30px]"
                src={Cart}
                alt="cart"
              />
            </Link>
            <Link href={""} className="hover:bg-slate-200">
              <Image
                className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]  md:w-[30px] md:h-[30px]"
                src={Chat}
                alt="chat"
              />
            </Link>
          </div>
          <div className="hidden sm:block mx-2 h-[20px] md:h-[30px] w-[1px] md:w-[2px] bg-gray-500">
            {" "}
          </div>
          <Link
            href={""}
            className="hidden sm:flex w-2/5 md:w-1/6 space-x-2 ml-4 hover:bg-slate-200"
          >
            <Image
              className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]  md:w-[30px] md:h-[30px]"
              src={Toko}
              alt="toko"
            />
            <h4 className="text-xs lg:text-sm mt-2 font-semibold text-color-grayPrimary">
              Toko
            </h4>
          </Link>
          <div className="hidden md:hidden lg:flex lg:w-3/6  items-center justify-center ">
            <Link href={""}>
              <Image className="w-10 h-10 rounded-full" src={Toko} alt="" />
            </Link>

            <div className="font-medium dark:text-white">
              <div className="text-[10px] lg:text-sm text-wrap ml-2 text-color-primary">
                Joined in August 2014
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

