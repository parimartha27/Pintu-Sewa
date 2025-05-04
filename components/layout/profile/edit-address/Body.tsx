"use client";

import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import EditProfileForm from "../Form";
import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddressProps, AddressResponseProps } from "@/types/address";
import { customerBaseUrl } from "@/types/globalVar";
import AddressFormSkeleton from "./AddressFormSkeleton";
import {
  EditAddressRequestProps,
  EditAddressResponseProps,
} from "@/types/editAddress";
import {
  fetchKabupaten,
  fetchKecamatan,
  fetchKodePos,
  fetchProvinsi,
} from "@/services/addressService";
import { dataAlamatProps } from "@/types/dataAlamat";
import { getIdByText, getTextById } from "@/hooks/useGetWilayahByTextOrId";
import LoadingPopup from "../../LoadingPopUp";
import { AlertProps } from "@/types/alert";
import Alert from "../../Alert";

const EditAddressBody = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [addressData, setAddressData] = useState<AddressProps>();
  const [customerId, setCustomerId] = useState("");

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
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const [, setErrors] = useState({
    jalan: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedCustomerId = localStorage.getItem("customerId") || "";
      setCustomerId(storedCustomerId);
    }
  }, [isClient]);

  useEffect(() => {
    if (!customerId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get<AddressResponseProps>(
          `${customerBaseUrl}/address/${customerId}`
        );
        const data = res.data.output_schema;
        setAddressData(data);
        setJalan(data.street);
        setCatatan(data.notes || "");
      } catch {
        console.error("Error fetching alamat di edit alamat");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  useEffect(() => {
    if (!addressData) return;

    const loadProvinsi = async () => {
      try {
        const data = await fetchProvinsi();
        if (data.status === 200) {
          setProvinsi(data.result);
          setSelectedProvinsi(
            getIdByText(addressData.province || "", data.result) ||
              data.result[0].id
          );
        }
      } catch (err) {
        console.error("Gagal mengambil data provinsi:", err);
      }
    };

    loadProvinsi();
  }, [addressData]);

  useEffect(() => {
    if (!selectedProvinsi || !addressData) return;

    const loadKabupaten = async () => {
      try {
        const data = await fetchKabupaten(selectedProvinsi);
        if (data.status === 200) {
          setKabupaten(data.result);
          setSelectedKabupaten(
            getIdByText(addressData.regency || "", data.result) ||
              data.result[0].id
          );
        }
      } catch (err) {
        console.error("Gagal mengambil data kabupaten:", err);
      }
    };

    loadKabupaten();
  }, [selectedProvinsi, addressData]);

  useEffect(() => {
    if (!selectedKabupaten || !addressData) return;

    const loadKecamatan = async () => {
      try {
        const data = await fetchKecamatan(selectedKabupaten);
        if (data.status === 200) {
          setKecamatan(data.result);
          setSelectedKecamatan(
            getIdByText(addressData.district || "", data.result) ||
              data.result[0].id
          );
        }
      } catch (err) {
        console.error("Gagal mengambil data kecamatan:", err);
      }
    };

    loadKecamatan();
  }, [selectedKabupaten, addressData]);

  useEffect(() => {
    if (!selectedKabupaten || !selectedKecamatan || !addressData) return;

    const loadKodePos = async () => {
      try {
        const data = await fetchKodePos(selectedKabupaten, selectedKecamatan);
        if (data.status === 200) {
          setKodePos(data.result);
          setSelectedKodePos(
            getIdByText(addressData.post_code || "", data.result) ||
              data.result[0].id
          );
        } else {
          setKodePos([]);
          setSelectedKodePos("");
        }
      } catch (err) {
        console.log("Gagal mengambil data kode pos:", err);
      }
    };

    loadKodePos();
  }, [selectedKabupaten, selectedKecamatan, addressData]);

  const validateForm = () => {
    const newErrors = {
      jalan: jalan.trim() ? "" : "Jalan tidak boleh kosong",
      provinsi: selectedProvinsi ? "" : "Provinsi harus dipilih",
      kabupaten: selectedKabupaten ? "" : "Kabupaten harus dipilih",
      kecamatan: selectedKecamatan ? "" : "Kecamatan harus dipilih",
    };

    setErrors(newErrors);

    const firstError = Object.values(newErrors).find((msg) => msg !== "");
    if (firstError) {
      setAlertState({
        isOpen: true,
        message: firstError,
      })
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoadingSubmit(true);

    const payload: EditAddressRequestProps = {
      id: customerId,
      street: jalan,
      district: getTextById(selectedKecamatan, kecamatan),
      regency: getTextById(selectedKabupaten, kabupaten),
      province: getTextById(selectedProvinsi, provinsi),
      post_code: getTextById(selectedKodePos, kodePos),
      notes: catatan,
    };

    try {
      const res = await axios.put<EditAddressResponseProps>(
        `${customerBaseUrl}/edit-address`,
        payload
      );
      if (res.data.error_schema.error_message === "SUCCESS") {
        router.push("/profile");
      } else {
        setAlertState({
          isOpen: true,
          message: "Gagal Mengedit Alamat",
        })
      }
    } catch (err) {
      setAlertState({
        isOpen: true,
        message: "Gagal Mengedit Alamat: "+ err,
      })
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (!isClient || loading) {
    return (
      <div className="flex w-full h-auto pb-12 md:pb-[462px]">
        <EditProfileForm title="Edit Alamat">
          <div className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10 w-full">
            <AddressFormSkeleton />
          </div>
        </EditProfileForm>
      </div>
    );
  }

  return (
    <>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() =>
            setAlertState({ isOpen: false, message: "", isWrong: true })
          }
          isWrong={alertState.isWrong}
        />
      )}{" "}
      <div className="flex w-full h-auto pb-12 md:pb-[462px]">
        <EditProfileForm title="Edit Alamat">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10 w-full"
          >
            {loading ? (
              <AddressFormSkeleton />
            ) : (
              <>
                {/* KIRI */}
                <div className="flex flex-col space-y-5 lg:w-1/2">
                  <LabelledInput
                    label="Jalan"
                    htmlFor="jalan"
                    id="jalan"
                    type="text"
                    value={jalan}
                    onChange={(e) => setJalan(e.target.value)}
                  />
                  <LabelledDropdown
                    label="Provinsi"
                    htmlFor="provinsi"
                    id="provinsi"
                    options={provinsi.map((k) => ({
                      value: k.id,
                      label: k.text,
                    }))}
                    value={selectedProvinsi}
                    onValueChange={setSelectedProvinsi}
                  />
                  <LabelledDropdown
                    label="Kabupaten / Kota"
                    htmlFor="kabupaten"
                    id="kabupaten"
                    options={kabupaten.map((k) => ({
                      value: k.id,
                      label: k.text,
                    }))}
                    value={selectedKabupaten}
                    onValueChange={setSelectedKabupaten}
                    disabled={!selectedProvinsi}
                  />
                  {loadingSubmit && <LoadingPopup />}
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="hidden lg:block w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr hover:opacity-90"
                  >
                    Simpan Perubahan
                  </Button>
                </div>

                {/* KANAN */}
                <div className="flex flex-col space-y-5 lg:w-1/2">
                  <LabelledDropdown
                    label="Kecamatan"
                    htmlFor="kecamatan"
                    id="kecamatan"
                    options={kecamatan.map((k) => ({
                      value: k.id,
                      label: k.text,
                    }))}
                    value={selectedKecamatan}
                    onValueChange={setSelectedKecamatan}
                    disabled={!selectedKabupaten}
                  />
                  <LabelledDropdown
                    label="Kode Pos"
                    htmlFor="kodepos"
                    id="kodepos"
                    options={kodePos.map((k) => ({
                      value: k.id,
                      label: k.text,
                    }))}
                    value={selectedKodePos}
                    onValueChange={setSelectedKodePos}
                    disabled={!selectedKecamatan}
                  />
                  <LabelledInput
                    label="Catatan"
                    htmlFor="catatan"
                    id="catatan"
                    type="text"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                  />
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="lg:hidden self-center lg:self-start w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr hover:opacity-90"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </>
            )}
          </form>
        </EditProfileForm>
      </div>
    </>
  );
};

export default EditAddressBody;
