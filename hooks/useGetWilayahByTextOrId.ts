import { dataAlamatProps } from "@/types/dataAlamat"

 export const getTextById = (id: string | number, data: dataAlamatProps[]) => {
    const item = data.find((item) => item.id === id.toString())
    return item ? item.text : ""
  }

  export const getIdByText = (text: string, data: dataAlamatProps[]): string | number => {
    const item = data.find((item) => item.text === text)
    return item ? item.id : ""
  }