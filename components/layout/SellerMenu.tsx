"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageSquare, History, Package, Wallet, User, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SellerMenuProps {
  className?: string
}

const MobileMenuToggle = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='absolute top-3 right-3 md:hidden'
      onClick={toggle}
    >
      {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
    </Button>
  )
}

const SellerMenu = ({ className }: SellerMenuProps) => {
  const [isProductOpen, setIsProductOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    localStorage.removeItem("shopId")
    localStorage.removeItem("shopName")
    localStorage.removeItem("shopImage")
    router.push("/")
  }

  // Close mobile SellerMenu when path changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile SellerMenu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileOpen])

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className='h-4 w-4' />,
      href: "/dashboard-seller",
    },
    {
      name: "Chat",
      icon: <MessageSquare className='h-4 w-4' />,
      href: "/dashboard-seller/chat",
    },
    {
      name: "Histori Pesanan",
      icon: <History className='h-4 w-4' />,
      href: "/dashboard-seller/transaction-history",
    },
    {
      name: "Wallet",
      icon: <Wallet className='h-4 w-4' />,
      href: "/dashboard-seller/wallet",
    },
    {
      name: "Pengaturan Toko",
      icon: <Settings className='h-4 w-4' />,
      href: "/dashboard-seller/setting",
    },
  ]

  const overlay = isMobileOpen && (
    <div
      className='fixed inset-0 bg-black/50 z-30 md:hidden'
      onClick={() => setIsMobileOpen(false)}
    />
  )

  return (
    <>
      {overlay}
      <div className={cn("fixed inset-y-0 left-0 z-40 w-64 transform bg-white transition-transform duration-300 md:static  h-1/3 rounded-lg shadow-md", isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0", className)}>
        <MobileMenuToggle
          isOpen={isMobileOpen}
          toggle={() => setIsMobileOpen(!isMobileOpen)}
        />

        <div className='flex flex-col h-full p-4 pt-14 md:pt-4'>
          <div className='space-y-1'>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                legacyBehavior
              >
                <a className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100")}>
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </Link>
            ))}

            <Collapsible
              open={isProductOpen}
              onOpenChange={setIsProductOpen}
              className='w-full'
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <Package className='h-4 w-4' />
                    <span>Produk</span>
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className={cn("h-4 w-4 transition-transform", isProductOpen ? "rotate-180" : "")}
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='pl-4 space-y-1'>
                <Link
                  href='/dashboard-seller/product'
                  legacyBehavior
                >
                  <a className={cn("flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === "/daftar-produk" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100")}>Daftar Produk</a>
                </Link>
                <Link
                  href='/dashboard-seller/product/add'
                  legacyBehavior
                >
                  <a className={cn("flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === "/tambah-produk" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100")}>Tambah Produk</a>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Button
              onClick={handleSignOut}
              variant='ghost'
              size='sm'
              className='w-full justify-start text-red-500'
            >
              <a
                href={"/"}
                className='flex items-center gap-2 rounded-md text-sm font-medium transition-colors'
              >
                <LogOut className='h-4 w-4' />
                <span>Logout</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Button (Fixed at bottom) */}
      <Button
        variant='default'
        size='icon'
        className='fixed bottom-4 left-4 z-50 rounded-full shadow-lg md:hidden bg-blue-600 hover:bg-blue-700'
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className='h-5 w-5' />
      </Button>
    </>
  )
}

export default SellerMenu
