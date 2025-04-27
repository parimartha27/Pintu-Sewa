"use client";

import { Button } from "@/components/ui/button";
import Star from "@/public/star.svg";
import TextedCheckbox from "../TextedCheckbox";
import FilterSection from "./Section";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFilter from "@/hooks/filter/useFilter";
import CustomModal from "@/components/layout/modalsTemplate";

interface dataAlamatProps {
  id: string;
  text: string;
}

const FilterBody = () => {
  const {
    handleMultiButtonFilter,
    isValueInMultiParam,
    isCheckboxSelected,
    handleCheckboxFilter,
    handleInputFilter,
    getInputValue,
    updateSearchParam,
  } = useFilter();
  const [province, setProvince] = useState<dataAlamatProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(getInputValue("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(getInputValue("maxPrice") || "");

  const rentDuration = getInputValue("rentDurations");

  const isHarianActive =
    rentDuration === "1" ||
    rentDuration === "4" ||
    rentDuration === "5" ||
    rentDuration === "7";
  const isMingguanActive =
    rentDuration === "2" ||
    rentDuration === "4" ||
    rentDuration === "6" ||
    rentDuration === "7";
  const isBulananActive =
    rentDuration === "3" ||
    rentDuration === "5" ||
    rentDuration === "6" ||
    rentDuration === "7";

  const handleRentDurationClick = (type: "harian" | "mingguan" | "bulanan") => {
    let newHarian = isHarianActive;
    let newMingguan = isMingguanActive;
    let newBulanan = isBulananActive;

    if (type === "harian") newHarian = !newHarian;
    if (type === "mingguan") newMingguan = !newMingguan;
    if (type === "bulanan") newBulanan = !newBulanan;

    let newRentDuration = "";

    if (newHarian && !newMingguan && !newBulanan) newRentDuration = "1";
    else if (!newHarian && newMingguan && !newBulanan) newRentDuration = "2";
    else if (!newHarian && !newMingguan && newBulanan) newRentDuration = "3";
    else if (newHarian && newMingguan && !newBulanan) newRentDuration = "4";
    else if (newHarian && !newMingguan && newBulanan) newRentDuration = "5";
    else if (!newHarian && newMingguan && newBulanan) newRentDuration = "6";
    else if (newHarian && newMingguan && newBulanan) newRentDuration = "7";
    else newRentDuration = "";

    updateSearchParam("rentDurations", newRentDuration || null);
  };

  useEffect(() => {
    if (!showModal) return;

    const fetchProvinsi = async () => {
      try {
        const response = await fetch(
          "https://alamat.thecloudalert.com/api/provinsi/get/"
        );
        const data = await response.json();
        if (data.status === 200) {
          setProvince(data.result);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinsi();
  }, [showModal]);

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
    { name: "Handphone" },
    { name: "Peralatan Rumah" },
    { name: "Pakaian Wanita" },
  ];

  const locations = ["DKI Jakarta", "Jawa Barat", "Bali", "Bandung"];

  return (
    <>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold mb-4">Daftar Lokasi</h2>
        {loading ? (
          <p className="text-sm text-gray-500">. . .</p>
        ) : (
          <ul className="space-y-3 max-h-[300px] overflow-y-auto">
            {province.map((location, index) => (
              <TextedCheckbox
                key={index}
                checked={isCheckboxSelected("locations", location.text)}
                onCheckedChange={() =>
                  handleCheckboxFilter(
                    "locations",
                    location.text,
                    !isCheckboxSelected("locations", location.text)
                  )
                }
              >
                {location.text}
              </TextedCheckbox>
            ))}
          </ul>
        )}
      </CustomModal>
      <div className="flex flex-col mb-4 shadow-sm p-2">
        <h2 className="mb-3 text-[16px] font-medium pl-2">Kategori</h2>
        <div className="flex flex-col w-full">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() =>
                handleMultiButtonFilter(
                  "categories",
                  category.name,
                  !isValueInMultiParam("categories", category.name)
                )
              }
              className={`bg-white py-1 pl-2 text-[14px] text-start hover:bg-color-third 
                ${
                  isValueInMultiParam("categories", category.name)
                    ? "text-color-primaryDark font-bold scale-y-105"
                    : "text-color-primary font-normal"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className=" flex-col pl-4 space-y-4">
        <FilterSection Header="Durasi Sewa">
          <Button
            onClick={() => handleRentDurationClick("harian")}
            className={`w-auto max-w-[57px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200 ${
              isHarianActive ? "bg-color-third" : "bg-transparent"
            }`}
          >
            Harian
          </Button>
          <Button
            onClick={() => handleRentDurationClick("mingguan")}
            className={`w-auto max-w-[76px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200 ${
              isMingguanActive ? "bg-color-third" : "bg-transparent"
            }`}
          >
            Mingguan
          </Button>
          <Button
            onClick={() => handleRentDurationClick("bulanan")}
            className={`w-auto max-w-[66px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200 ${
              isBulananActive ? "bg-color-third" : "bg-transparent"
            }`}
          >
            Bulanan
          </Button>
        </FilterSection>
        <FilterSection Header="Lokasi">
          {locations.map((location, index) => (
            <TextedCheckbox
              key={index}
              checked={isCheckboxSelected("locations", location)}
              onCheckedChange={() =>
                handleCheckboxFilter(
                  "locations",
                  location,
                  !isCheckboxSelected("locations", location)
                )
              }
            >
              {location}
            </TextedCheckbox>
          ))}
          <button
            onClick={() => {
              setShowModal(true);
              setLoading(true);
            }}
            className="text-start text-[12px] text-color-primaryDark hover:text-blue-900"
          >
            Lihat Selengkapnya
          </button>
        </FilterSection>
        <FilterSection Header="Harga">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInputFilter("minPrice", minPrice);
            }}
            className="max-w-[220px] w-auto"
          >
            <div className="relative h-[40px]">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                  Rp
                </p>
              </div>
              <input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                type="text"
                className="bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                  placeholder:text-color-primary text-[12px] rounded-lg 
                  focus:ring-1 focus:ring-color-primaryDark  focus:outline-none
                  focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
                placeholder="Harga Minimum"
              />
            </div>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInputFilter("maxPrice", maxPrice);
            }}
            className="max-w-[220px] w-auto"
          >
            <div className="relative h-[40px]">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                  Rp
                </p>
              </div>
              <input
                onChange={(e) => setMaxPrice(e.target.value)}
                value={maxPrice}
                type="text"
                className="bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                  placeholder:text-color-primary text-[12px] rounded-lg 
                  focus:ring-1 focus:ring-color-primaryDark  focus:outline-none
                  focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
                placeholder="Harga Maksimum"
              />
            </div>
          </form>
        </FilterSection>
        <FilterSection Header="Rent to Buy">
          <TextedCheckbox
            checked={isCheckboxSelected("isRnbOptions", "true")}
            onCheckedChange={() =>
              handleCheckboxFilter(
                "isRnbOptions",
                "true",
                !isCheckboxSelected("isRnbOptions", "true")
              )
            }
          >
            Ya
          </TextedCheckbox>
          <TextedCheckbox
            checked={isCheckboxSelected("isRnbOptions", "false")}
            onCheckedChange={() =>
              handleCheckboxFilter(
                "isRnbOptions",
                "false",
                !isCheckboxSelected("isRnbOptions", "false")
              )
            }
          >
            Tidak
          </TextedCheckbox>
        </FilterSection>
        <FilterSection Header="Rating">
          {[5, 4, 3, 2, 1].map((rating) => (
            <TextedCheckbox
              key={rating}
              checked={isCheckboxSelected("minRatings", rating.toString())}
              onCheckedChange={() =>
                handleCheckboxFilter(
                  "minRatings",
                  rating.toString(),
                  !isCheckboxSelected("minRatings", rating.toString())
                )
              }
            >
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
        {/* <FilterSection Header="Durasi Pengiriman">
          <TextedCheckbox>1 Hari</TextedCheckbox>
          <TextedCheckbox>2 Hari</TextedCheckbox>
          <TextedCheckbox>3 Hari</TextedCheckbox>
          <TextedCheckbox>Instant</TextedCheckbox>
        </FilterSection> */}
      </div>
    </>
  );
};

export default FilterBody;
