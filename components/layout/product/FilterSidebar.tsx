import { useState } from "react";
import Image from "next/image";
import Filter from "@/public/filter.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TextedCheckbox from "@/components/fragments/TextedCheckbox";
import FilterSection from "@/components/fragments/filter/Section";
import Star from "@/public/star.svg";

const FilterSidebar = () => {
  const categories = [
    { name: "Mobil" },
    { name: "Pakaian Pria" },
    { name: "Alat Tukang" },
    { name: "Board Game" },
    { name: "Elektronik" },
    { name: "Motor" },
    { name: "Alat Kesehatan" },
    { name: "Peralatan Sekolah" },
    { name: "Komputer" },
    { name: "Akun Subskripsi" },
    { name: "Peralatan Bayi" },
    { name: "Furniture" },
    { name: "Alat Olahraga" },
    { name: "Gadget" },
    { name: "Peralatan Rumah" },
    { name: "Pakaian Wanita" },
  ];

  const locations = ["Jabodetabek", "Jawa Barat", "Bali", "Bandung"];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-slate-200 md:hidden"
      >
        <Image
          className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]  md:w-[30px] md:h-[30px]"
          src={Filter}
          alt="chat"
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Layout */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-white z-50 shadow-xl transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-[24px] font-semibold text-color-primary">
            Filter
          </h2>
        </div>

        {/* Body (Scrollable) */}
        <div className="h-[calc(100vh-120px)] overflow-y-auto flex flex-col px-4">
          {/* Section 1 */}

          <div className="flex flex-col mb-12 shadow-md p-4">
            <h2 className="mb-6 text-[16px] font-medium pl-2">Kategori</h2>
            <div className="flex flex-col w-full">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-white py-2 pl-2 text-color-primary text-[14px] text-start hover:bg-color-third hover:text-color-primaryDark"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <FilterSection Header="Durasi Sewa">
            <Button className="w-auto max-w-[57px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200">
              Harian
            </Button>
            <Button className="w-auto max-w-[76px] px-2 text-[12px] font-light text-white bg-color-primaryDark hover:bg-blue-900">
              Mingguan
            </Button>
            <Button className="w-auto max-w-[66px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200">
              Bulanan
            </Button>
          </FilterSection>

          <FilterSection Header="Lokasi">
            {locations.map((location, index) => (
              <TextedCheckbox key={index}>{location}</TextedCheckbox>
            ))}
            <button className="text-start text-[12px] text-color-primaryDark hover:text-blue-900">
              Lihat Selengkapnya
            </button>
          </FilterSection>

          <FilterSection Header="Co-renting">
            <TextedCheckbox>Ya</TextedCheckbox>
            <TextedCheckbox>Tidak</TextedCheckbox>
          </FilterSection>

          <FilterSection Header="Harga">
            <form className="max-w-[220px] w-auto">
              <div className="relative h-[40px]">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                  <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                    Rp
                  </p>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-color-primaryDark text-color-primaryDark placeholder:text-color-primary text-[12px] rounded-lg focus:ring-color-primaryDark focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
                  placeholder="Harga Minimum"
                />
              </div>
            </form>
            <form className="max-w-[220px] w-auto">
              <div className="relative h-[40px]">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                  <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-5 flex items-center h-[90%]">
                    Rp
                  </p>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-color-primaryDark text-color-primaryDark placeholder:text-color-primary text-[12px] rounded-lg focus:ring-color-primaryDark focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
                  placeholder="Harga Maksimum"
                />
              </div>
            </form>
          </FilterSection>

          <FilterSection Header="Rent to Buy">
            <TextedCheckbox>Ya</TextedCheckbox>
            <TextedCheckbox>Tidak</TextedCheckbox>
          </FilterSection>

          <FilterSection Header="Rating">
            {[5, 4, 3, 2, 1].map((rating) => (
              <TextedCheckbox key={rating}>
                <div className="flex space-x-3 items-center">
                  <Image
                    width={14}
                    height={12}
                    src={Star}
                    alt={`Star ${rating}`}
                  />
                  <p className="text-[12px] text-color-primary">{rating}</p>
                </div>
              </TextedCheckbox>
            ))}
          </FilterSection>

          <FilterSection Header="Durasi Pengiriman">
            <TextedCheckbox>1 Hari</TextedCheckbox>
            <TextedCheckbox>2 Hari</TextedCheckbox>
            <TextedCheckbox>3 Hari</TextedCheckbox>
            <TextedCheckbox>Instant</TextedCheckbox>
          </FilterSection>

          
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
