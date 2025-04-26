"use client"
import AddressForm from "./AddressForm"
import MetodePembayaranLayout from "./MetodePembayaran"
import CheckoutProductForm from "./ProductForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { customerBaseUrl } from "@/types/globalVar"
import { AddressProps, AddressResponseProps } from "@/types/address"

const CheckOutBody = () => {
  const [checkoutItemDecider, setCheckoutItemDecider] = useState<string | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [address, setAddress] = useState<AddressProps>()
  const [checkoutItem, setCheckoutItem] = useState()

  useEffect(() => {
    // This code will only run on the client side
    const decider = localStorage.getItem("checkoutFrom")
    const id = localStorage.getItem("customerId")
    setCheckoutItemDecider(decider)
    setCustomerId(id)

    const fetchData = async () => {
      try {
        if (id) {
          const addressRes = await axios.get<AddressResponseProps>(`${customerBaseUrl}/address/${id}`)
          setAddress(addressRes.data.output_schema)

          if (decider === "cart") {
            // Your cart logic here
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto bg-color-layout p-2'>
      <div className='flex flex-col'>
        <div className='flex flex-col w-full mt-[28px] space-y-4'>
          <h2 className='w-full text-xl md:text-2xl font-semibold text-color-primary'>Pembayaran</h2>
          {/* <CheckoutSkeleton/> */}
          <AddressForm />
        </div>
        <div className='flex flex-col pb-3 pt-0 mt-8'>
          <CheckoutProductForm />
          <CheckoutProductForm />
          <CheckoutProductForm />
          <CheckoutProductForm />
        </div>
      </div>
      <div className='mt-8'>
        <MetodePembayaranLayout />
      </div>
    </div>
  )
}

export default CheckOutBody
