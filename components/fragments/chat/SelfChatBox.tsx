import Image from "next/image";
import Ceklist from "@/public/ceklist.svg";

interface Props {
  message: string;
  time: string;
}

const SelfChatBox = ({ message, time }: Props) => {
  return (
    <div
      className="flex flex-col self-end space-y-1 bg-color-secondary rounded-lg px-3 py-2 max-w-[250px] xl:max-w-[400px]"
    >
      <h3 className="text-white">
        {message}
      </h3>
      <div className="flex space-x-1 self-end items-center">
        <h4 className="text-xs text-white text-end">{time}</h4>
      </div>
    </div>
  );
};

export default SelfChatBox;
