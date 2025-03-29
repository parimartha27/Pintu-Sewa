import { Card } from "@/components/ui/card";
import Image from "next/image";
import Location from "@/public/location.svg";
import Chat from "@/public/chat.svg";
import { Button } from "@/components/ui/button";
import Star from "@/public/star.svg";
import { useRouter } from "next/navigation";
import Product from "@/public/productTest.jpeg";

const ShopHeader = () => {
  const router = useRouter();
  return (
    <Card className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 w-full items-center lg:justify-between py-4 px-4 lg:py-6 lg:px-8 border-none shadow-md">
      <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 w-full sm:w-auto">
        <Image
          className="w-16 h-16 sm:w-[100px] sm:h-[100px] self-center rounded-full"
          src={Product}
          alt="guest"
        />
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl sm:text-2xl font-semibold text-color-primary mb-1 text-center sm:text-left">
            Matt Studio
          </h2>
          <div className="flex items-center space-x-1 mb-2">
            <Image className="w-3 h-3" src={Location} alt="location" />
            <h3 className="text-xs sm:text-sm text-color-primary">
              Jakarta Utara
            </h3>
          </div>
          <Button
            onClick={() => router.push("/chat")}
            className="w-full max-w-[180px] sm:w-[180px] h-8 py-2 bg-transparent text-color-primaryDark border-[1px] text-sm sm:text-[16px] border-color-primaryDark hover:bg-slate-200"
          >
            <Image
              className="w-5 h-5 sm:w-6 sm:h-6 mr-1"
              src={Chat}
              alt="chat"
            />
            <h3>Chat Penyewa</h3>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-7 space-y-4 sm:space-y-0 w-full sm:w-auto">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <Image className="w-4 h-4 sm:w-5 sm:h-5" src={Star} alt="star" />
            <h3 className="text-lg sm:text-xl text-color-primary font-semibold">
              5.0
            </h3>
          </div>
          <h3 className="text-xs sm:text-sm text-color-primary text-center">
            Rating dan Ulasan
          </h3>
        </div>

        <div className="sm:w-[2px] sm:h-[42px] bg-[#D9D9D9] self-center hidden sm:block"></div>

        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <h3 className="text-lg sm:text-xl text-color-primary font-semibold">
              4 Jam
            </h3>
          </div>
          <h3 className="text-xs sm:text-sm text-color-primary text-center">
            Pesanan Diproses
          </h3>
        </div>

        <div className="sm:w-[2px] sm:h-[42px] bg-[#D9D9D9] self-center hidden sm:block"></div>

        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <h3 className="text-lg sm:text-xl text-color-primary font-semibold">
              08:00 - 17:00
            </h3>
          </div>
          <h3 className="text-xs sm:text-sm text-color-primary text-center">
            Jam Operasional Toko
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default ShopHeader;
