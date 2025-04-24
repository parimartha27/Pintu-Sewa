"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import NavigationBar from "@/components/NavigationBar"
import Sidebar from "@/components/Sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='flex min-h-screen flex-col'>
      <NavigationBar />
      <div className='flex flex-1'>
        {/* Mobile sidebar toggle */}
        <Button
          variant='outline'
          size='icon'
          className='fixed bottom-4 right-4 z-50 rounded-full md:hidden'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
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
              className='h-4 w-4'
            >
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          ) : (
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
              className='h-4 w-4'
            >
              <line
                x1='4'
                x2='20'
                y1='12'
                y2='12'
              />
              <line
                x1='4'
                x2='20'
                y1='6'
                y2='6'
              />
              <line
                x1='4'
                x2='20'
                y1='18'
                y2='18'
              />
            </svg>
          )}
        </Button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out md:sticky md:top-16 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ top: "64px", height: "calc(100vh - 64px)" }}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <main className='flex-1 p-4 md:p-6'>{children}</main>
      </div>
    </div>
  )
}

export default AppLayout
