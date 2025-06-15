"use client";
import { Button } from "@/components/ui/button";
import dev1 from "@/public/dev1.jpg";
import dev2 from "@/public/dev2.jpg";
import dev3 from "@/public/dev3.jpg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PintuSewa from "@/public/pintuSewa.svg";

const AboutBody = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col py-8 px-4 min-h-screen gap-14">
      {/* Tentang Kami */}
      <section id="about-developers" className="w-full">
        <div className="flex flex-col items-center gap-6 px-4 py-8">
          <h1 className="text-4xl font-bold text-center">Tentang Kami</h1>

          {/* Gambar */}
          <div className="w-full max-w-3xl">
            <Image
              width={700}
              height={700}
              src={PintuSewa}
              alt="Pintu Sewa"
              className="object-contain w-full sm:h-[250px] md:h-[250px]"
            />
          </div>

          {/* Penjelasan */}
          <p className="max-w-7xl text-center text-gray-600 text-base sm:text-lg leading-relaxed px-4">
            Solusi terpercaya untuk kebutuhan sewa properti Anda. Kami
            menyediakan layanan profesional dengan dukungan teknologi terkini
            untuk memudahkan proses sewa-menyewa secara cepat, aman, dan
            transparan.
          </p>
        </div>
      </section>

      {/* Tentang Pengembang */}
      <section id="about-developers" className="w-full">
        <div className="flex flex-col items-center gap-4 px-4">
          <h1 className="text-4xl font-bold text-center">Tentang Pengembang</h1>
          <p className="max-w-2/5 text-center text-gray-500 ">
            Kami adalah tim pengembang yang berfokus pada solusi digital untuk
            kebutuhan properti dan sewa-menyewa.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-9 justify-center p-7">
          <div className="relative w-full md:w-[320px] border-2 rounded-lg overflow-hidden shadow-md">
            <Image
              width={700}
              height={700}
              src={dev1}
              alt="dev1"
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-11/12 bg-white bg-opacity-90 px-4 py-3 rounded-md">
              <p className="text-lg font-semibold text-gray-900">Putu Agus Parimartha</p>
              <p className="text-sm text-gray-500">Developer</p>
            </div>
          </div>
          <div className="relative w-full md:w-[320px] border-2 rounded-lg overflow-hidden shadow-md">
            <Image
              width={700}
              height={700}
              src={dev2}
              alt="dev2"
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-11/12 bg-white bg-opacity-90 px-4 py-3 rounded-md">
              <p className="text-lg font-semibold text-gray-900">
                Andryan
              </p>
              <p className="text-sm text-gray-500">Developer</p>
            </div>
          </div>
          <div className="relative w-full md:w-[320px] border-2 rounded-lg overflow-hidden shadow-md">
            <Image
              width={700}
              height={700}
              src={dev3}
              alt="dev3"
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-11/12 bg-white bg-opacity-90 px-4 py-3 rounded-md">
              <p className="text-lg font-semibold text-gray-900">
                Steven Matthew
              </p>
              <p className="text-sm text-gray-500">Developer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutBody;
