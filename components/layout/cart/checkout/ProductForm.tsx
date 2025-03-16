import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import ProductInCheckoutDetail from "@/components/fragments/checkout/ProductInCheckoutDetail";
import Tootlip from "@/public/tooltip.svg";
import Edit from "@/public/edit.svg";

const CheckoutProductForm = () => {
  return (
    <Card className="w-full max-h-auto p-1 pt-4 shadow-lg mt-8 px-6">
      <CardHeader className="w-full flex space-x-4 items-center md:items-center pb-0 pl-0 pt-0">
        <Checkbox />
        <h2 className="text-[16px] font-semibold text-color-primary pb-1">
          Nama Toko
        </h2>
      </CardHeader>
      <CardContent className="mt-3 flex-col p-0 ">
        <ProductInCheckoutDetail />
        <ProductInCheckoutDetail />
      </CardContent>
      <CardFooter className="p-0 pt-3 pb-7 border-t-[1px] border-t-[#D9D9D9] justify-center sm:justify-end">
        <div className="flex-col max-w-[500px] w-full space-y-[14px]">
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <h3 className="text-color-primary text-[12px] md:text-sm">Deposit</h3>
              <Image src={Tootlip} alt="tooltip" className="hover:opacity-80" />
            </div>
            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              Rp. 400.000
            </h3>
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <h3 className="text-color-primary text-[12px] md:text-sm">Opsi Pengiriman</h3>
              <Image src={Edit} alt="edit" className="hover:opacity-70 hover:cursor-pointer" />
            </div>
            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              JNT Express
            </h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-color-primary text-[12px] md:text-sm">Ongkos Kirim</h3>

            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              Rp. 30.000
            </h3>
          </div>

          <div className="flex justify-between">
            <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
              Total Produk Disewa (2 produk)
            </h3>

            <h3 className="text-color-secondary text-[14px] sm:text-[16px] lg:text-lg font-bold">
              Rp. 400.000.000
            </h3>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CheckoutProductForm;
