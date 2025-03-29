import Image from "next/image";
import Product from "@/public/productTest.jpeg";

interface ContactCardProps {
    setShowContacts: (value: boolean) => void; 
  }

const ContactCard = ({ setShowContacts } : ContactCardProps) => {

   
  const contohTeks ="Stoknya masih ada kak, silakan bisa langsung dipesan ya...";
  return (
    <div
      className="flex w-full px-4 py-3 justify-between hover:bg-slate-200 cursor-pointer"
      onClick={() => setShowContacts(false)}
    >
      <div className="w-full flex">
        <Image className="w-14 h-14 rounded-full" src={Product} alt="guest" />
        <div className="flex flex-col ml-4">
          <h3 className="text-base text-color-primary font-semibold">
            Sewa Buku
          </h3>
          <h4 className="text-sm text-color-grayPrimary">
            {contohTeks.length > 35
              ? contohTeks.slice(0, 35) + "..."
              : contohTeks}
          </h4>
        </div>
      </div>

      <div className="flex flex-col space-y-[6px] min-w-[70px]">
        <h3 className="text-xs text-color-grayPrimary text-end">19:48</h3>
        <div className="w-auto min-w-[24px] min-h-[20px] px-2 py-1 bg-color-secondary rounded-full flex items-center justify-center self-end">
          <h4 className="text-xs text-white text-center">1</h4>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
