import NoHistory from "@/public/noChat.svg";
import Image from "next/image";

const NoChat = () => {
  return (
    <div className="flex flex-col space-y-6 w-full justify-center items-center">
      <Image className="w-52 h-52" src={NoHistory} alt="noChat" />
      <div>
        <h2 className="text-color-primary text-sm max-w-[310px] text-center">
          Kamu belum memiliki
          <span className="font-semibold"> history chat</span>.
        </h2>

        <h2 className="text-color-primary text-sm max-w-[310px]">
          Yuk
          <span className="font-semibold"> mulai chat</span> dengan
          <span className="font-semibold"> penyedia jasa</span>!
        </h2>
      </div>
    </div>
  );
};

export default NoChat;
