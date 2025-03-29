import Image from "next/image";
import RegisterImage from "@/public/register.svg";

const FotoVideoPenyewa = () => {
    return(
        <div className="hidden lg:flex flex-col w-full space-y-4">
            <h2 className="lg:text-lg xl:text-2xl font-semibold text-color-primary">Foto & Video Penyewa</h2>
            <div className="flex space-x-2">
                {[1,2,3,4,5].map((index) => (
                    <Image src={RegisterImage} alt="register" key={index} className="w-[60px] h-[60px] xl:w-[88px] xl:h-[88px] bg-amber-300 rounded-md"/>
                ))}
            </div>
        </div>
    );
}

export default FotoVideoPenyewa