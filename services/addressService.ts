import axios from "axios";

export const fetchProvinsi = async () => {
  const res = await axios.get("https://alamat.thecloudalert.com/api/provinsi/get/");
  return res.data;
};

export const fetchKabupaten = async (provId: string | number) => {
  const res = await axios.get(
    `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provId}`
  );
  return res.data;
};

export const fetchKecamatan = async (kabId: string | number) => {
  const res = await axios.get(
    `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${kabId}`
  );
  return res.data;
};

export const fetchKodePos = async (kabId: string | number, kecId: string | number) => {
  const res = await axios.get(
    `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${kabId}&d_kecamatan_id=${kecId}`
  );
  return res.data;
};
