import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import ProductImage from "@/public/productTest.jpeg";

const ProductOrderHistoryContent = () => {
  return (
<CardContent className="flex flex-col sm:flex-row justify-between py-4 px-0 border-t border-t-[#D9D9D9] border-opacity-50 space-y-3 sm:space-y-0">
  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
    <div className="w-14 h-14 sm:w-[88px] sm:h-[88px] flex-shrink-0">
      <Image src={ProductImage} alt="product" className="w-full h-full rounded-md" />
    </div>
    <div className="flex flex-col space-y-1 sm:space-y-2">
      <h2 className="text-sm sm:text-base text-color-primary font-semibold">
        Novel Karangan Saya
      </h2>
      <h2 className="text-xs sm:text-sm text-color-primary">
        28 Januari 2025 - 28 Februari 2025
      </h2>
      <h2 className="text-xs sm:text-sm text-color-primary">1 barang x Rp 500.000</h2>
    </div>
  </div>
  <div className="flex flex-col items-end text-end space-y-1 sm:space-y-2">
    <h2 className="text-xs sm:text-sm text-color-primary font-semibold">Total Biaya</h2>
    <h2 className="text-sm sm:text-lg text-color-primaryDark font-semibold">Rp 2.000.000</h2>
  </div>
</CardContent>

  );
};

export default ProductOrderHistoryContent;
