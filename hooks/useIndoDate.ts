export const parseIndoDateToISO = (indoDate: string): string => {
    const monthMap: { [key: string]: number } = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    };
  
    const [day, monthIndo, year] = indoDate.split(" ");
    const month = monthMap[monthIndo];
  
    const dateObj = new Date(Number(year), month, Number(day));
    return dateObj.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };
  