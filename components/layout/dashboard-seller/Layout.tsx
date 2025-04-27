import { ReactNode } from "react"
import NavbarSeller from "@/components/layout/NavbarSeller"
import SellerMenu from "@/components/layout/SellerMenu"
import Footer from "@/components/layout/Footer"

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <NavbarSeller />
      <div className='flex flex-1 mx-16 my-6 pb-20'>
        <SellerMenu className='w-64 hidden md:block' />
        <main className='flex-1 p-4 md:py-0 pl-6 pr-0'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
