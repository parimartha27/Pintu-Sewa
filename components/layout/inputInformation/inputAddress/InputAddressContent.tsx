"use client";

import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown";
import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface dataAlamatProps {
  id: string;
  text: string;
}

const InputAddressContentLayout = () => {
  const router = useRouter();
  const [provinsi, setProvinsi] = useState<dataAlamatProps[]>([]);
  const [kabupaten, setKabupaten] = useState<dataAlamatProps[]>([]);
  const [kecamatan, setKecamatan] = useState<dataAlamatProps[]>([]);
  const [kodePos, setKodePos] = useState<dataAlamatProps[]>([]);
  const [jalan, setJalan] = useState("");
  const [catatan, setCatatan] = useState("");
  const [selectedProvinsi, setSelectedProvinsi] = useState<string | number>("");
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | number>(
    ""
  );
  const [selectedKecamatan, setSelectedKecamatan] = useState<string | number>(
    ""
  );
  const [selectedKodePos, setSelectedKodePos] = useState<string | number>("");
  

  const [errors, setErrors] = useState({
    jalan: "",
    catatan: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
  });
  

  const getTextById = (id: string | number, data: dataAlamatProps[]) => {
    const item = data.find(item => item.id === id.toString());
    return item ? item.text : '';
  };

  const getIdByText = (text: string, data: dataAlamatProps[]): string | number => {
    const item = data.find(item => item.text === text);
    return item ? item.id : '';
  };

  useEffect(() => {
    setJalan(localStorage.getItem("jalan") || "");
    // setSelectedProvinsi(localStorage.getItem("provinsi") || "");
    // setSelectedKabupaten(localStorage.getItem("kabupaten") || "");
    // setSelectedKecamatan(localStorage.getItem("kecamatan") || "");
    // setSelectedKodePos(localStorage.getItem("kodepos") || "");
    setCatatan(localStorage.getItem("catatan") || "");
  }, []);

  const validateForm = () => {
    const newErrors = {
      jalan: jalan.trim() ? "" : "Jalan tidak boleh kosong",
      catatan: catatan.trim() ? "" : "Catatan tidak boleh kosong",
      provinsi: selectedProvinsi ? "" : "Provinsi harus dipilih",
      kabupaten: selectedKabupaten ? "" : "Kabupaten harus dipilih",
      kecamatan: selectedKecamatan ? "" : "Kecamatan harus dipilih",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem("jalan", jalan);
    localStorage.setItem("catatan", catatan);
    localStorage.setItem("provinsi", getTextById(selectedProvinsi, provinsi));
    localStorage.setItem("kabupaten", getTextById(selectedKabupaten, kabupaten));
    localStorage.setItem("kecamatan", getTextById(selectedKecamatan, kecamatan));
    localStorage.setItem("kodepos", getTextById(selectedKodePos, kodePos)  || "");
  
    router.push("/input-confirmation");
  };

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await fetch(
          "https://alamat.thecloudalert.com/api/provinsi/get/"
        );
        const data = await response.json();
        if (data.status === 200) {
          setProvinsi(data.result);
          setSelectedProvinsi(getIdByText(localStorage.getItem("provinsi") || "1", data.result) || data.result[0].id);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      }
    };
    fetchProvinsi();
  }, []);

  useEffect(() => {
    const fetchKabupaten = async () => {
      if (selectedProvinsi) {
        try {
          const response = await fetch(
            `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${selectedProvinsi}`
          );
          const data = await response.json();
          if (data.status === 200) {
            setKabupaten(data.result);
            setSelectedKabupaten(getIdByText(localStorage.getItem("kabupaten") || "1", data.result) || data.result[0].id);
          }
        } catch (error) {
          console.error("Gagal mengambil data kabupaten:", error);
        }
      }
    };
    fetchKabupaten();
  }, [selectedProvinsi]);

  useEffect(() => {
    const fetchKecamatan = async () => {
      if (selectedKabupaten) {
        try {
          const response = await fetch(
            `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${selectedKabupaten}`
          );
          const data = await response.json();
          if (data.status === 200) {
            setKecamatan(data.result);
            setSelectedKecamatan(getIdByText(localStorage.getItem("kecamatan") || "1", data.result) || data.result[0].id);
          }
        } catch (error) {
          console.error("Gagal mengambil data kecamatan:", error);
        }
      }
    };
    fetchKecamatan();
  }, [selectedKabupaten]);

  useEffect(() => {
    const fetchKodePos = async () => {
      if (selectedKabupaten && selectedKecamatan) {
        try {
          // console.log("selected kabupaten:" + selectedKabupaten, "selectedKecamatan :" + selectedKecamatan);
          const response = await fetch(
            `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${selectedKabupaten}&d_kecamatan_id=${selectedKecamatan}`
          );
          const data = await response.json();
          if (data.status === 200) {
            setKodePos(data.result);
            setSelectedKodePos(getIdByText(localStorage.getItem("kodepos") || "1", data.result) || data.result[0].id);
          }else{
            setKodePos([]);
            setSelectedKodePos("");}
        } catch (error) {
          console.log("Gagal mengambil data kode pos:", error);
        }
      }
    };
    fetchKodePos();
  }, [selectedKabupaten, selectedKecamatan]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row mt-5  lg:space-y-0 lg:space-x-10 w-full"
    >
      <div className="flex flex-col space-y-5 lg:w-1/2">
        <div className="flex flex-col">
          {errors.jalan && (
            <p className="text-red-500 text-xs md:text-md">{errors.jalan}</p>
          )}
          <LabelledInput
            label="Jalan"
            htmlFor="jalan"
            id="jalan"
            type="text"
            value={jalan}
            onChange={(e) => setJalan(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          {errors.provinsi && (
            <p className="text-red-500 text-xs md:text-md">{errors.provinsi}</p>
          )}
          <LabelledDropdown
            label="Provinsi"
            htmlFor="provinsi"
            id="provinsi"
            options={provinsi.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedProvinsi}
            onValueChange={setSelectedProvinsi}
          />
        </div>
        <div className="flex flex-col">
          {errors.kabupaten && (
            <p className="text-red-500 text-xs md:text-md">
              {errors.kabupaten}
            </p>
          )}
          <LabelledDropdown
            label="Kabupaten"
            htmlFor="kabupaten"
            id="kabupaten"
            options={kabupaten.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedKabupaten}
            onValueChange={setSelectedKabupaten}
            disabled={!selectedProvinsi}
          />
        </div>

        <div className="flex space-x-6">
          <Button
            type="submit"
            className="hidden lg:block w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr rounded-xl hover:opacity-90"
          >
            Simpan
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/input-biodata")}
            className="hidden lg:block w-[200px] h-[48px] mt-3 text-color-primaryDark text-[14px] font-medium bg-transparent border-[1px] border-color-primaryDark rounded-xl hover:bg-slate-200 hover:opacity-90"
          >
            Kembali
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-5 lg:w-1/2">
        <div className="flex flex-col">
          {errors.kecamatan && (
            <p className="text-red-500 text-xs md:text-md">
              {errors.kecamatan}
            </p>
          )}
          <LabelledDropdown
            label="Kecamatan"
            htmlFor="kecamatan"
            id="kecamatan"
            options={kecamatan.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedKecamatan}
            onValueChange={setSelectedKecamatan}
            disabled={!selectedKabupaten}
          />
        </div>
        <div className="flex flex-col">
          {/* {errors.kodepos && (
            <p className="text-red-500 text-xs md:text-md">{errors.kodepos}</p>
          )} */}
          <LabelledDropdown
            label="Kode Pos"
            htmlFor="kodepos"
            id="kodepos"
            options={kodePos.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedKodePos}
            onValueChange={setSelectedKodePos}
            disabled={!selectedKecamatan}
          />
        </div>
        <div className="flex flex-col">
          {errors.catatan && (
            <p className="text-red-500 text-xs md:text-md">{errors.catatan}</p>
          )}
          <LabelledInput
            label="Catatan"
            htmlFor="catatan"
            id="catatan"
            type="text"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full md:flex-row md:space-x-8 lg:space-x-0  lg:justify-between max-w-[430px]">
          <Button
            type="submit"
            className="lg:hidden w-full self-center max-w-[250px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr rounded-xl hover:opacity-90"
          >
            Simpan
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/input-biodata")}
            className="lg:hidden w-full self-center max-w-[250px] h-[48px] mt-3 text-[14px] font-medium text-color-primaryDark bg-transparent border-[1px] border-color-primaryDark rounded-xl hover:bg-slate-200 hover:opacity-90"
          >
            Kembali
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InputAddressContentLayout;
