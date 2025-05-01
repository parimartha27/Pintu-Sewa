import Image from "next/image"
import ProductImage from "@/public/productTest.jpeg"
import { RentedItemProps } from "@/types/checkout"
import { formatToRupiah } from "@/hooks/useConvertRupiah"

const ProductInCheckoutDetail = ({ rentedItemDetail }: { rentedItemDetail: RentedItemProps }) => {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between mb-6 lg:mb-3 pt-6 lg:pt-3 border-t-[1px] border-t-[#D9D9D9] '>
      <div className='flex space-x-8'>
        <div className='flex space-x-4 '>
          <Image
            width={60}
            height={60}
            // src={rentedItemDetail.image || ProductImage.src}
            src={ProductImage.src}
            alt='product'
            className='w-[60px] h-[60px] xl:w-[88px] xl:h-[88px] rounded-md'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='text-color-primary text-[16px] font-semibold'>{rentedItemDetail.product_name || "Nama Toko"}</h2>
          <h2 className='text-color-primaryDark text-[16px] font-semibold'>{formatToRupiah(rentedItemDetail.price) || "gratis"}</h2>
        </div>
      </div>

      <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8 lg:space-x-16 mt-10 md:mt-0'>
        <div className='flex flex-col space-y-1 md:space-y-3'>
          <h2 className='text-color-primary text-[14px] font-semibold'>Periode Sewa</h2>
          <h2 className='text-color-primary text-[14px] md:space-y-3'>{`${rentedItemDetail.start_rent_date} - ${rentedItemDetail.end_rent_date}` || "Tidak Diketahui"}</h2>
        </div>
        <div className='flex flex-col space-y-1 md:space-y-3'>
          <h2 className='text-color-primary text-[14px] font-semibold'>Durasi Sewa</h2>
          <h2 className='text-color-primary text-[14px]'>{rentedItemDetail.rent_duration || "Tidak Diketahui"}</h2>
        </div>
        <div className='flex flex-col space-y-1 md:space-y-3'>
          <h2 className='text-color-primary text-[14px] font-semibold'>Quantity</h2>
          <h2 className='text-color-primary text-[14px]'>{rentedItemDetail.quantity || "0"}</h2>
        </div>
      </div>

      <div className='flex flex-col items-end space-y-1 lg:space-y-3 mt-6 lg:mt-0'>
        <h2 className='text-color-primary text-[16px] lg:text-sm mr-[6px] font-semibold'>Subtotal Harga</h2>
        <h2 className='text-color-primaryDark text-[18px] lg:text-[16px] font-semibold'>{formatToRupiah(rentedItemDetail.price * rentedItemDetail.quantity) || "gratis"}</h2>
      </div>
    </div>
  )
}

export default ProductInCheckoutDetail
