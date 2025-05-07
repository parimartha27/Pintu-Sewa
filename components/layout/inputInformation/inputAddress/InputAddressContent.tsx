"use client";

import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown";
import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import { Button } from "@/components/ui/button";
import { getIdByText, getTextById } from "@/hooks/useGetWilayahByTextOrId";
import {
  fetchKabupaten,
  fetchKecamatan,
  fetchKodePos,
  fetchProvinsi,
} from "@/services/addressService";
import { dataAlamatProps } from "@/types/dataAlamat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isClient, setIsClient] = useState(false);

  const [errors, setErrors] = useState({
    jalan: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    setJalan(localStorage.getItem("jalan") || "");
    setCatatan(localStorage.getItem("catatan") || "");
  }, [isClient]);

  const validateForm = () => {
    const newErrors = {
      jalan: !jalan.trim()
        ? "Jalan tidak boleh kosong"
        : jalan.trim().length < 5
        ? "Jalan minimal 5 karakter"
        : "",
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

    if (!isClient) return;

    localStorage.setItem("jalan", jalan);
    localStorage.setItem("catatan", catatan);
    localStorage.setItem("provinsi", getTextById(selectedProvinsi, provinsi));
    localStorage.setItem(
      "kabupaten",
      getTextById(selectedKabupaten, kabupaten)
    );
    localStorage.setItem(
      "kecamatan",
      getTextById(selectedKecamatan, kecamatan)
    );
    localStorage.setItem(
      "kodepos",
      getTextById(selectedKodePos, kodePos) || ""
    );

    router.push("/input-confirmation");
  };

  useEffect(() => {
    const loadProvinsi = async () => {
      try {
        const data = await fetchProvinsi();
        if (data.status === 200) {
          setProvinsi(data.result);
          if (isClient) {
            const stored = localStorage.getItem("provinsi") || "1";
            const matched = getIdByText(stored, data.result);
            setSelectedProvinsi(matched || data.result[0]?.id || "");
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data provinsi:", err);
      }
    };

    loadProvinsi();
  }, [isClient]);

  useEffect(() => {
    const loadKabupaten = async () => {
      if (!selectedProvinsi) return;
      try {
        const data = await fetchKabupaten(selectedProvinsi);
        if (data.status === 200) {
          setKabupaten(data.result);
          if (isClient) {
            const stored = localStorage.getItem("kabupaten") || "1";
            const matched = getIdByText(stored, data.result);
            setSelectedKabupaten(matched || data.result[0]?.id || "");
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data kabupaten:", err);
      }
    };

    loadKabupaten();
  }, [selectedProvinsi, isClient]);

  useEffect(() => {
    const loadKecamatan = async () => {
      if (!selectedKabupaten) return;
      try {
        const data = await fetchKecamatan(selectedKabupaten);
        if (data.status === 200) {
          setKecamatan(data.result);
          if (isClient) {
            const stored = localStorage.getItem("kecamatan") || "1";
            const matched = getIdByText(stored, data.result);
            setSelectedKecamatan(matched || data.result[0]?.id || "");
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data kecamatan:", err);
      }
    };

    loadKecamatan();
  }, [selectedKabupaten, isClient]);

  useEffect(() => {
    const loadKodePos = async () => {
      if (!selectedKabupaten || !selectedKecamatan) return;
      try {
        const data = await fetchKodePos(selectedKabupaten, selectedKecamatan);
        if (data.status === 200) {
          setKodePos(data.result);
          if (isClient) {
            const stored = localStorage.getItem("kodepos") || "1";
            const matched = getIdByText(stored, data.result);
            setSelectedKodePos(matched || data.result[0]?.id || "");
          }
        } else {
          setKodePos([]);
          setSelectedKodePos("");
        }
      } catch (err) {
        console.error("Gagal mengambil data kode pos:", err);
      }
    };

    loadKodePos();
  }, [selectedKabupaten, selectedKecamatan, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row mt-5 lg:space-y-0 lg:space-x-10 w-full"
    >
      <div className="flex flex-col space-y-5 lg:w-1/2">
        <div className="flex flex-col">
          <LabelledInput
            label="Jalan"
            htmlFor="jalan"
            id="jalan"
            type="text"
            value={jalan}
            onChange={(e) => setJalan(e.target.value)}
          />
          {errors.jalan && (
            <p className="text-red-500 text-xs md:text-md pt-2">
              {errors.jalan}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <LabelledDropdown
            label="Kabupaten / Kota"
            htmlFor="kabupaten"
            id="kabupaten"
            options={kabupaten.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedKabupaten}
            onValueChange={setSelectedKabupaten}
            disabled={!selectedProvinsi}
          />
          {errors.kabupaten && (
            <p className="text-red-500 text-xs md:text-md pt-2">
              {errors.kabupaten}
            </p>
          )}
        </div>
        <div className="flex flex-col">
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
          <LabelledDropdown
            label="Kecamatan"
            htmlFor="kecamatan"
            id="kecamatan"
            options={kecamatan.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedKecamatan}
            onValueChange={setSelectedKecamatan}
            disabled={!selectedKabupaten}
          />
          {errors.kecamatan && (
            <p className="text-red-500 text-xs md:text-md pt-2">
              {errors.kecamatan}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <LabelledDropdown
            label="Provinsi"
            htmlFor="provinsi"
            id="provinsi"
            options={provinsi.map((k) => ({ value: k.id, label: k.text }))}
            value={selectedProvinsi}
            onValueChange={setSelectedProvinsi}
          />
          {errors.provinsi && (
            <p className="text-red-500 text-xs md:text-md pt-2">
              {errors.provinsi}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <LabelledInput
            label="Catatan"
            htmlFor="catatan"
            id="catatan"
            type="text"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full md:flex-row md:space-x-8 lg:space-x-0 lg:justify-between max-w-[430px]">
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
