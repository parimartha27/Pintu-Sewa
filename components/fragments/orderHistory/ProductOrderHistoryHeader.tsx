import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CardHeader } from "@/components/ui/card";
import Chat from "@/public/chat.svg";

interface OrderStatusCardProps {
  status: string;
}

const ProductOrderHistoryHeader = ({ status }: OrderStatusCardProps) => {
  let bgColor = "bg-gray-300";
  let textColor = "text-black";

  switch (status) {
    case "Belum Dibayar":
      bgColor = "bg-[#D9D9D9]";
      textColor = "text-color-primary";
      break;
    case "Diproses":
      bgColor = "bg-[#FDCC0D]";
      textColor = "text-[#590505]";
      break;
    case "Dikirim":
      bgColor = "bg-color-third";
      textColor = "text-color-primaryDark";
      break;
    case "Sedang Disewa":
      bgColor = "bg-color-secondary";
      textColor = "text-white";
      break;
    case "Dibatalkan":
      bgColor = "bg-[#BB0909]";
      textColor = "text-white";
      break;
    case "Dikembalikan":
      bgColor = "bg-[#05593E]";
      textColor = "text-white";
      break;
    case "Selesai":
      bgColor = "bg-custom-gradient-tr";
      textColor = "text-white";
      break;
  }
  return (
    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 space-y-2 sm:space-y-0">
      <div className="flex flex-wrap items-center space-x-2 sm:space-x-3">
        <div
          className={`rounded-sm px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}
        >
          {status || "Status Tidak Diketahui"}
        </div>
        <h2 className="text-xs sm:text-sm text-color-primary">17 Maret 2025</h2>
        <h2 className="text-xs sm:text-sm text-color-primary">
          PS20250317141010123
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <h2 className="text-xs sm:text-sm text-color-primary font-semibold">
          Parimartha Studio
        </h2>
        <Button
          onClick={() => alert("Chat")}
          className="flex items-center gap-x-1 px-2 py-1 rounded-sm bg-transparent hover:bg-slate-200 border border-color-primaryDark text-xs sm:text-sm"
        >
          <Image
            src={Chat}
            alt="edit"
            width={18}
            height={18}
            className="hidden sm:block"
          />
          <h4 className="text-color-primary">Chat</h4>
        </Button>
        <Button
          onClick={() => alert("Chat")}
          className="px-2 py-1 rounded-sm bg-transparent hover:bg-slate-200 border border-color-primary text-color-primary text-xs sm:text-sm"
        >
          Lihat Toko
        </Button>
      </div>
    </CardHeader>
  );
};

export default ProductOrderHistoryHeader;
