import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BCA from "@/public/BCA.svg";
import BRI from "@/public/BRI.svg";
import BNI from "@/public/BNI.svg";
import Money from "@/public/money.svg";
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MetodePembayaranLayout = () => {
  return (
    <Card className="px-2 md:px-6 mb-[224px]">
      <CardHeader className="flex flex-col items-center md:flex-row md:justify-between px-0">
        <h2 className="text-[16px] font-semibold text-color-primary">
          Metode Pembayaran
        </h2>
        <h3 className="text-sm font-medium text-color-secondary hover:opacity-70 hover:cursor-pointer">
          Lihat Semua
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row md:space-x-12 lg:space-x-[147px] p-0 pb-7 pt-[18px] md:pt-0 border-t-[1px] border-t-[#D9D9D9]">
        <div className="flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3">
          <MetodePembayaranFragments nama="BCA Virtual Account" gambar={BCA} />
          <MetodePembayaranFragments nama="BRI Virtual Account" gambar={BRI} />
          <MetodePembayaranFragments nama="BNI Virtual Account" gambar={BNI} />
        </div>

        <div className="hidden md:flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3 lg:ml-[147px]">
          <MetodePembayaranFragments nama="BCA Virtual Account" gambar={BCA} />
          <MetodePembayaranFragments nama="BRI Virtual Account" gambar={BRI} />
          <MetodePembayaranFragments nama="BNI Virtual Account" gambar={BNI} />
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-[18px] pb-7 border-t-[1px] border-t-[#D9D9D9] justify-center md:justify-end">
        <div className="flex-col max-w-[500px] w-full space-y-[14px]">
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
                Subtotal untuk Produk
              </h3>
            </div>
            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              Rp. 40.000.000
            </h3>
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
                Subtotal Ongkos Kirim{" "}
              </h3>
            </div>
            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              Rp. 40.000
            </h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-color-primary text-[12px] md:text-sm">
              Subtotal Deposit
            </h3>

            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              Rp. 600.000
            </h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-color-primary text-[12px] md:text-sm">
              Biaya Layanan
            </h3>

            <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
              Rp. 30.000
            </h3>
          </div>

          <div className="flex justify-between">
            <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
              Total Pembayaran
            </h3>

            <h3 className="text-color-secondary text-[14px] lg:text-lg font-bold">
              Rp. 400.000.000
            </h3>
          </div>
          <Button className="flex justify-self-center md:justify-self-end w-full max-w-[320px] xl:h-[54px] rounded-xl hover:opacity-80 bg-custom-gradient-tr">
                <Image src={Money} alt="money" className="w-5 h-3 xl:w-5 xl:h-5"/>
                <h4 className="text-[12px] xl:text-lg font-medium ">Bayar</h4>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MetodePembayaranLayout;
