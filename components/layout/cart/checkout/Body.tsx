"use client";

import AddressForm from "./AddressForm";
import ProductForm from "./ProductForm";



const CheckOutBody = () => {
  return (
    <div className="flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto bg-slate-200 p-2">

      <div className="flex flex-col">
        <div className="flex flex-col w-full mt-[60px] space-y-4">
          <h2 className="w-full text-xl md:text-2xl font-semibold text-color-primary">
            Ringkasan Sewa
          </h2>
            <AddressForm/>
        </div>
        <ProductForm/>
      </div>

      <div className="flex flex-col">


      </div>
    </div>
  );
};

export default CheckOutBody;
