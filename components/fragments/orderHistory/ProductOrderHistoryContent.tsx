import { CardContent } from "@/components/ui/card"
import Image from "next/image"
import ProductImage from "@/public/productTest.jpeg"
import { Product } from "@/types/orderHistory"
import { formatToRupiah } from "@/hooks/useConvertRupiah"

const ProductOrderHistoryContent = ({ orderHistoryProduct }: { orderHistoryProduct: Product }) => {
  return (
    <CardContent className='flex flex-col sm:flex-row justify-between py-4 px-0 border-t border-t-[#D9D9D9] border-opacity-50 space-y-3 sm:space-y-0'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
        <div className='w-14 h-14 sm:w-[88px] sm:h-[88px] flex-shrink-0'>
          <Image
            width={88}
            height={88}
            src={ProductImage}
            // src={orderHistoryProduct.image || ProductImage}
            alt={orderHistoryProduct.name}
            className='w-full h-full rounded-md'
          />
        </div>
        <div className='flex flex-col space-y-1 sm:space-y-2'>
          <h2 className='text-sm sm:text-base text-color-primary font-semibold'>{orderHistoryProduct.name || "Nama Produk"}</h2>
          <h2 className='text-xs sm:text-sm text-color-primary'>
            {orderHistoryProduct.start_date && orderHistoryProduct.end_date ? `${orderHistoryProduct.start_date} - ${orderHistoryProduct.end_date}` : "28 Januari 2025 - 28 Februari 2025"}
          </h2>
          <h2 className='text-xs sm:text-sm text-color-primary'>
            {orderHistoryProduct.quantity || "qty"} barang x {formatToRupiah(orderHistoryProduct.price) || "gratis"}
          </h2>
        </div>
      </div>
      <div className='flex flex-col items-end self-end text-end space-y-1 sm:space-y-2'>
        <h2 className='text-xs sm:text-sm text-color-primary font-medium'>Subtotal</h2>
        <h2 className='text-sm text-color-primary font-semibold'>{formatToRupiah(orderHistoryProduct.subtotal) || "gratis"}</h2>
      </div>
    </CardContent>
  )
}

export default ProductOrderHistoryContent
