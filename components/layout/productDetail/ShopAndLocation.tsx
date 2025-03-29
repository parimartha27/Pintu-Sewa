import Image from "next/image";
import Link from "next/link";
import RegisterImage from "@/public/register.svg";
import Star from "@/public/star.svg";
import Chat from "@/public/chat.svg";
import Truck from "@/public/truck.svg";
import Location from "@/public/location.svg";
import { Button } from "@/components/ui/button";

const ShopAndLocation = () => {
  return (
    <div className="w-full mt-7 flex flex-col px-2">
      <div className="flex justify-between border-y-[1px] border-[#D9D9D9]">
        <div className="flex space-x-3 py-[14px]">
          <Image
            src={RegisterImage}
            alt="register"
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-md bg-amber-500"
          />
          <div className="flex flex-col">
            <h2 className="text-[14px] lg:text-lg text-color-primary font-medium">
              Nama Toko
            </h2>
            <div className="flex space-x-[6px] items-center">
              <Image
                src={Star}
                alt="star"
                className="w-[12px] h-[11px] lg:w-[15.4px] lg:h-[14px]"
              />
              <h4 className="font-normal text-[10px] lg:text-sm text-color-primary">
                5.0
              </h4>
              <h4 className="font-normal text-[10px] lg:text-sm text-color-grayPrimary">
                (40 ribu)
              </h4>
            </div>
          </div>
        </div>
        <Link href={`/chat`}>
          <Button className="flex max-w-[72px] max-h-[28px] lg:max-h-8 h-full gap-x-1 mt-3 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark">
            <Image
              src={Chat}
              alt="edit"
              className="mt-1 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]"
            />
            <h4 className="text-color-primaryDark text-[12px] lg:text-sm lg:font-medium">
              Chat
            </h4>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col pt-3 pl-5 space-y-2">
        <h2 className="text-[12px] lg:text-[16px] font-semibold text-color-primary">
          Pengiriman
        </h2>
        <div className="flex space-x-[6px]">
          <Image
            src={Location}
            alt="truck"
            className="w-[14px] h-[10px] lg:w-[16px] lg:h-[16px]"
          />
          <h4 className="text-[10px] lg:text-sm lg:font-medium text-color-primary">
            Dikirim dari <span className="font-bold">Jakarta Utara</span>
          </h4>
        </div>
        <div className="flex space-x-[6px]">
          <Image
            src={Truck}
            alt="truck"
            className="w-[14px] h-[10px] lg:w-[16px] lg:h-[16px]"
          />
          <h4 className="text-[10px] lg:text-sm lg:font-medium text-color-primary">
            Ongkir mulai Rp 50.000
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ShopAndLocation;
