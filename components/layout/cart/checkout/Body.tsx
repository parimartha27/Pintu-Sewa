"use client"
import AddressForm from "./AddressForm";
import MetodePembayaranLayout from "./MetodePembayaran";
import CheckoutProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { customerBaseUrl } from "@/types/globalVar";
import { AddressProps, AddressResponseProps } from "@/types/address";


const CheckOutBody = () => {

  const checkoutItemDecider = localStorage.getItem("checkoutFrom");
  const customerId = localStorage.getItem("customerId");
  const [address, setAddress] = useState<AddressProps>();
  const [checkoutItem, setCheckoutItem] = useState();

  useEffect(() => {
    const fetchData = async () => {
    try{
      
      const addressRes = await axios.get<AddressResponseProps>(`${customerBaseUrl}/address/${customerId}`);
      setAddress(addressRes.data.output_schema);

      if(checkoutItemDecider === "cart"){

      }
    }catch{}
  }
  fetchData();
  },[])

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto bg-color-layout p-2">
      <div className="flex flex-col">
        <div className="flex flex-col w-full mt-[28px] space-y-4">
          <h2 className="w-full text-xl md:text-2xl font-semibold text-color-primary">
            Pembayaran
          </h2>
          {/* <CheckoutSkeleton/> */}
          <AddressForm />
        </div>
        <div className="flex flex-col pb-3 pt-0 mt-8">
          <CheckoutProductForm />
          <CheckoutProductForm />
          <CheckoutProductForm />
          <CheckoutProductForm />
        </div>
      </div>
      <div className="mt-8">

        <MetodePembayaranLayout/>
      </div>
    </div>
  );
};

export default CheckOutBody;
