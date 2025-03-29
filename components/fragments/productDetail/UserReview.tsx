import Image from "next/image";
import Guest from "@/public/guest.svg";
import Star from "@/public/star.svg";
import RegisterImage from "@/public/register.svg";

const UserReview = () => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex space-x-3">
        <Image src={Guest} alt="guest" className="w-8 h-8 lg:w-10 lg:h-10" />
        <div className="flex flex-col">
          <h2 className="text-[12px] lg:text-[16px] text-color-primary font-medium lg:font-semibold">
            Nama User
          </h2>
          <div className="flex space-x-2">
            <div className="flex space-x-1 py-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Image
                  src={Star}
                  alt="star"
                  className="w-2 h-2 lg:w-[14px] lg:h-[12.73px]"
                  key={rating}
                />
              ))}
            </div>
            <h3 className="text-[10px] lg:text-xs text-color-primary">
              1 jam yang lalu
            </h3>
          </div>
        </div>
      </div>

      <h4 className="w-full text-start text-color-primary text-[10px] lg:text-sm py-2">
        Saya sangat puas dengan pengalaman menyewa barang di sini. Proses
        pemesanan sangat mudah dan cepat, serta barang yang disewa dalam kondisi
        sangat baik dan bersih.
      </h4>

      <div className="flex space-x-2">
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            src={RegisterImage}
            alt="register-image"
            className="w-8 h-8 lg:w-[60px] lg:h-[60px] rounded-md bg-amber-300"
          />
        ))}
      </div>
    </div>
  );
};

export default UserReview;
