export const formatToRupiah = (value: number | string): string => {
  return `Rp${Number(value).toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
