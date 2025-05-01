import Image from "next/image";
import Product from "@/public/productTest.jpeg";

interface ContactCardProps {
  setShowContacts: (value: boolean) => void;
  contactDetail: {
    id: string;
    name: string;
    image: string;
    customer_id : string;
    shop_id : string;
  };
  onClick: () => void;
}

const ContactCard = ({ setShowContacts, contactDetail, onClick }: ContactCardProps) => {
  return (
    <div
      className="flex w-full px-4 py-3 justify-between hover:bg-slate-200 cursor-pointer"
      onClick={() => {
        setShowContacts(false);
        onClick();
      }}
    >
      <div className="w-full flex items-center">
        <Image
          className="w-14 h-14 rounded-full"
          src={contactDetail.image}
          alt={contactDetail.name}
          width={56}
          height={56}
        />
        <div className="flex justify-center align-center ml-4">
          <h3 className="text-base text-color-primary font-semibold">
            {contactDetail.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
