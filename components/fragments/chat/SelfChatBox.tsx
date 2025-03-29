import Image from "next/image";
import Ceklist from "@/public/ceklist.svg";

const SelfChatBox = () => {
  return (
    <div
      className="flex flex-col self-end space-y-1 bg-color-secondary rounded-lg px-3 py-2 max-w-[250px] xl:max-w-[400px]"
    >
      <h3 className="text-white">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil eum
        tenetur
      </h3>
      <div className="flex space-x-1 self-end items-center">
        <h4 className="text-xs text-white text-end">18:12</h4>
        <Image className="w-4 h-4" src={Ceklist} alt="ceklist" />
      </div>
    </div>
  );
};

export default SelfChatBox;
