"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Toko from "@/public/toko.svg"
import Cart from "@/public/cart.svg"
import Chat from "@/public/chat.svg"
import Guest from "@/public/guest.svg"
import PintuSewa from "@/public/pintuSewa.svg"
import { Button } from "../ui/button"
import FilterSidebar from "./product/FilterSidebar"
import { Skeleton } from "../ui/skeleton"
import optionDots from "@/public/optionDots.svg"
import Search from "@/public/search.svg"
import Suggestion from "../fragments/navbar/Suggestion"
import { debounce } from "@/hooks/useDebounce"
import axios from "axios"
import { SearchResponseProps } from "@/types/searchResponse"
import { searchSuggestionBaseUrl } from "@/types/globalVar"
import { useAuth } from "@/hooks/auth/useAuth"

interface NavbarProps {
  type?: string | null
}

const Navbar = ({ type }: NavbarProps) => {
  // const [token] = useState<string>(localStorage.getItem("token") || "");
  // const { data: session, status } = useSession();
  const router = useRouter()
  // const [username, setUsername] = useState<string>(
  //   localStorage.getItem("username") || "Guest"
  // );
  const [profileImage, setProfileImage] = useState<string>("")
  const [loading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [openOptionMobile, setOpenOptionMobile] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const popupMobileRef = useRef<HTMLDivElement | null>(null)
  const [suggestionOpen, setSuggestionOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResponseProps>()
  // const [token, setToken] = useState<string>("")
  const [username, setUsername] = useState<string>("Guest")
  const { token, customerId } = useAuth()

  useEffect(() => {
    // const storedToken = token;
    // const storedCustomerId = customerId;
    const storedUsername = localStorage.getItem("username")
    const storedImage = localStorage.getItem("image")

    // if (storedToken) {
    //   setToken(storedToken)
    // }

    if (storedUsername) {
      setUsername(storedUsername)
    }

    if (storedImage) {
      setProfileImage(storedImage)
    } else {
      setProfileImage(Guest.src)
    }
    setIsLoading(false)
  }, [])

  const debouncedSearch = useRef(
    debounce((query: string) => {
      if (query.trim() === "") return

      axios
        .get(`${searchSuggestionBaseUrl}?keyword=${query}`)
        .then((res) => {
          setSearchResults(res.data)
        })
        .catch((error) => {
          console.error("Search error:", error)
        })
    }, 100)
  ).current

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (popupRef.current && !popupRef.current.contains(target)) {
        setOpen(false)
      }

      if (formRef.current && !formRef.current.contains(target)) {
        setSuggestionOpen(false)
      }

      if (popupMobileRef.current && !popupMobileRef.current.contains(target)) {
        setOpenOptionMobile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // useEffect(() => {
  //   if (status !== "loading") {
  //     setIsLoading(false);

  //     if (status === "authenticated") {
  //       setUsername(session?.user?.name || "Guest");
  //       setProfileImage(session?.user?.image || Guest);
  //     }

  //     console.log("token: " + token);
  //     if (token && customerId) {
  //       const image = localStorage.getItem("image");
  //       console.log("ada token: " + token);
  //       console.log("ada customerId: " + customerId);
  //       // console.log("google image: " + image + " guest " + Guest.src)

  //       setUsername(localStorage.getItem("username") || "Guest");

  //       if (image) {
  //         console.log("ada image");
  //         setProfileImage(image);
  //       } else {
  //         console.log("tidak ada image");
  //         setProfileImage(Guest.src);
  //       }
  //     }
  //   }
  // }, []);

  return (
    <div className='flex flex-col w-full sticky top-0 z-50'>
      <div className='h-[24px] bg-color-primaryDark w-full'></div>

      <div className='flex h-[70px] lg:h-[70px] shadow-lg bg-white w-full p-2'>
        <div className='hidden md:flex flex-col items-center justify-center w-1/6 lg:w-2/12'>
          <Link href='/'>
            <Image
              src={PintuSewa}
              alt='pintu-sewa'
              width={150}
              height={50}
              className='ml-8 lg:ml-8 md:w-[200px] h-[50px] object-contain'
            />
          </Link>
        </div>
        <div className='flex w-11/12 md:w-4/6 lg:w-7/12 p-1.5 items-center justify-center md:ml-10 lg:ml-0 relative'>
          <form
            className='lg:w-11/12 lg:ml-10 w-full h-full'
            ref={formRef}
            onClick={() => setSuggestionOpen(!suggestionOpen)}
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim() !== "") {
                router.push(`/product?name=${encodeURIComponent(searchQuery)}&page=1&size=16`)
              }
            }}
          >
            <div className='relative h-full'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <Image
                  src={Search}
                  alt='search'
                />
              </div>
              <input
                type='search'
                className='w-full h-full pl-10 pr-4 py-5 text-[12px] lg:text-sm border-2 border-[#D9D9D9] border-opacity-75 rounded-sm font-jakartaSans text-color-primary focus:ring-0 focus:ring-color-secondary focus:border-color-secondary outline-none'
                placeholder='Cari barang yang pengen disewa'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {suggestionOpen && searchResults && (
                <div className='absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-1 z-50 max-h-[400px] overflow-y-auto'>
                  {searchResults.output_schema.products.map((product) => (
                    <Suggestion
                      key={product.id}
                      type='search'
                      title={product.name}
                      category={product.category}
                    />
                  ))}

                  {searchResults.output_schema.shops.map((shop) => (
                    <Suggestion
                      key={shop.id}
                      type='shop'
                      title={shop.name}
                      id={shop.id}
                      image={shop.image}
                    />
                  ))}
                </div>
              )}
            </div>
          </form>
          <Button
            onClick={(e) => {
              e.preventDefault()
              if (searchQuery.trim() !== "") {
                router.push(`/product?name=${encodeURIComponent(searchQuery)}&page=1&size=16`)
              }
            }}
            className='hidden lg:block ml-3 lg:h-[38px] xl:h-[43px] w-[100px] bg-color-primaryDark hover:bg-blue-900 rounded-sm'
          >
            Cari
          </Button>
        </div>

        <div className='flex justify-center md:justify-start lg:justify-center items-center lg:ml-0 lg:mr-0 w-1/5 md:w-2/6 lg:w-3/12'>
          {loading ? (
            <div className='flex items-center gap-4 pr-4'>
              <div className='hidden md:flex items-center gap-4'>
                <Skeleton className='hidden xl:block h-[30px] w-[60px] rounded-full ml-5' />

                <div className='hidden lg:flex items-center gap-2 ml-2'>
                  <Skeleton className='h-[40px] w-[5px] rounded-full mr-2' />
                  <Skeleton className='h-[40px] w-[60px] rounded-md' />
                </div>

                <div className='flex gap-2 justify-end'>
                  <Skeleton className='h-[40px] w-[80px] rounded-md' />
                  <Skeleton className='h-[40px] w-[80px] rounded-md' />
                </div>
              </div>
            </div>
          ) : token && customerId ? (
            /* ================== Sudah login ======================= */
            <>
              <div className='flex min-w-[60px] sm:w-2/5 md:w-2/6 md:max-w-[200px] space-x-3 lg:space-x-1 pr-1 justify-end mt-2 lg:mr-2 md:ml-6 lg:ml-0'>
                <div
                  onClick={() => router.push("/cart")}
                  className='hover:opacity-75 lg:ml-2 cursor-pointer'
                >
                  <Image
                    src={Cart}
                    alt='cart'
                    width={30}
                    height={30}
                    className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]'
                  />
                </div>

                {type === "product" ? (
                  <div className='md:mt-1'>
                    <FilterSidebar />
                  </div>
                ) : (
                  <>
                    <Link
                      href='/chat'
                      // href="/dev"
                      className='hidden hover:opacity-75 md:block lg:hidden'
                    >
                      <Image
                        src={Chat}
                        alt='chat'
                        width={30}
                        height={30}
                        className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]'
                      />
                    </Link>
                    <Image
                      className='md:hidden w-[5px] hover:opacity-75 cursor-pointer '
                      src={optionDots}
                      alt='optionDots'
                      width={5}
                      height={5}
                      onClick={() => setOpenOptionMobile(!openOptionMobile)}
                    />
                    {/* Popup Menu */}
                    {openOptionMobile && (
                      <div
                        ref={popupMobileRef}
                        className='absolute md:hidden top-10 right-5 w-40 bg-white shadow-lg rounded-md z-10'
                      >
                        <button
                          className='block w-full text-color-primaryDark text-left p-2 hover:bg-color-third'
                          onClick={() => router.push("/profile")}
                        >
                          Profile
                        </button>
                        <button
                          className='block w-full text-left text-color-primaryDark p-2 hover:bg-color-third'
                          onClick={() => window.location.href("/create-shop")}
                          // onClick={() => router.push("/dev")}
                        >
                          Toko
                        </button>
                        <button
                          className='block w-full text-left text-color-primaryDark p-2 hover:bg-color-third'
                          onClick={() => router.push("/chat")}
                          // onClick={() => router.push("/dev")}
                        >
                          Chat
                        </button>
                        <button
                          className='block w-full text-left text-color-primaryDark p-2 hover:bg-color-third'
                          onClick={() => router.push("/")}
                        >
                          Dashboard
                        </button>
                      </div>
                    )}
                  </>
                )}

                <Link
                  href='/chat'
                  // href="/dev"
                  className='hidden lg:block hover:opacity-75'
                >
                  <Image
                    src={Chat}
                    alt='chat'
                    width={30}
                    height={30}
                    className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]'
                  />
                </Link>
              </div>

              <div className='hidden sm:block mx-2 min-h-[30px] min-w-[2px] bg-gray-500 mt-2' />

              <Link
                href='/dashboard-seller'
                // href="/dev"
                className='hidden sm:flex w-2/5 md:w-1/6 space-x-2 mt-1 ml-1 hover:opacity-75 lg:ml-3'
              >
                <Image
                  src={Toko}
                  alt='toko'
                  width={30}
                  height={30}
                  className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]'
                />
                <h4 className='text-xs lg:hidden xl:block lg:text-sm mt-2 font-semibold text-color-primary'>Toko</h4>
              </Link>

              <div className='hidden lg:flex lg:w-3/6 items-center justify-center mt-2'>
                <Link
                  href='/profile'
                  className='lg:ml-5'
                >
                  <Image
                    src={profileImage || Guest.src}
                    alt='profile'
                    width={40}
                    height={40}
                    className=' w-10 h-10 rounded-full object-cover'
                  />
                </Link>
                <div className='font-medium dark:text-white w-20'>
                  <div className='text-[10px] lg:text-[12px] text-wrap ml-1 line-clamp-2 text-color-primary lg:hidden xl:block'>{username}</div>
                </div>
              </div>
            </>
          ) : (
            /* ================== Belum login ======================= */
            <>
              <div className='flex w-full justify-center'>
                {type === "product" ? (
                  <div className='lg:hidden mt-2 lg w-[40px] pl-2'>
                    <FilterSidebar />
                  </div>
                ) : (
                  <>
                    {" "}
                    <Image
                      className='md:hidden min-w-[5px] hover:opacity-75 cursor-pointer'
                      src={optionDots}
                      alt='optionDots'
                      width={5}
                      height={5}
                      onClick={() => setOpen(!open)} // Toggle popup
                    />
                    {/* Popup Menu */}
                    {open && (
                      <div
                        ref={popupRef}
                        className='absolute top-10 right-5 w-40 bg-white shadow-lg rounded-md z-10'
                      >
                        <button
                          className='block w-full text-color-primaryDark text-left p-2 hover:bg-color-third'
                          onClick={() => router.push("/login")}
                        >
                          Login
                        </button>
                        <button
                          className='block w-full text-left text-color-primaryDark p-2 hover:bg-color-third'
                          onClick={() => router.push("/register")}
                        >
                          Register
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className='hidden md:flex w-11/12 justify-center space-x-1 md:space-x-7 mr-1 xl:mr-10'>
                <div
                  onClick={() => router.push("/cart")}
                  className='hidden md:flex lg:w-[30px] lg:h-[30px] justify-center items-center mt-1 ml-1 hover:opacity-75 cursor-pointer'
                >
                  <Image
                    className='min-w-[30px]'
                    src={Cart}
                    alt='cart'
                  />
                </div>
                <div className='hidden align-self-center md:block h-[40px] min-w-[2px] bg-gray-500'> </div>
                <div className='w-7/12 flex space-x-3 md:mt-1 lg:mt-0'>
                  <Button
                    onClick={() => router.push("/login")}
                    className='w-1/2 xl:w-[150px] max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[40px]  text-[10px] lg:text-[14px] rounded-sm bg-white text-color-primary outline-none border-2 border-color-primaryDark hover:bg-slate-200'
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={() => router.push("/register")}
                    className='w-1/2 xl:w-[150px] max-w-[80px] lg:max-w-[120px] h-[30px] lg:h-[40px]  text-[10px] lg:text-[14px] rounded-sm bg-custom-gradient-tr hover:bg-blue-900'
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
  )
}

export default Navbar
