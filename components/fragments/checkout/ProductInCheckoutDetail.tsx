import Image from "next/image"
import ProductImage from "@/public/productTest.jpeg"
import { RentedItemProps } from "@/types/checkout"
import { formatToRupiah } from "@/hooks/useConvertRupiah"

const ProductInCheckoutDetail = ({ rentedItemDetail }: { rentedItemDetail: RentedItemProps }) => {
  return (
    <div className='flex flex-col md:flex-row md:justify-between md:items-stretch mb-6 lg:mb-3 pt-6 lg:pt-3 border-t-[1px] border-t-[#D9D9D9]'>
      <div className='flex space-x-4 w-full md:w-[300px] items-center'>
        <Image
          width={60}
          height={60}
          src={rentedItemDetail.image || ProductImage.src}
          alt='product'
          className='w-[80px] h-[80px] xl:w-[88px] xl:h-[88px] rounded-md'
        />
        <div className='flex flex-col justify-center space-y-2  px-2 py-1 rounded-md w-full'>
          <h2 className='text-color-primary text-[16px] font-semibold'>{rentedItemDetail.product_name || "Nama Toko"}</h2>
          <h2 className='text-color-primaryDark text-[16px] font-semibold'>{formatToRupiah(rentedItemDetail.price) || "gratis"}</h2>
        </div>
      </div>

      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-16 justify-start md:justify-center md:px-4 py-2 rounded-md mt-4 md:mt-0 w-full md:w-[50%] lg:w-[60%]'>
        <div className='flex flex-col space-y-1 md:space-y-3'>
          <h2 className='text-color-primary text-[14px] font-semibold'>Periode Sewa</h2>
          <h2 className='text-color-primary text-[14px]'>{`${rentedItemDetail.start_rent_date} - ${rentedItemDetail.end_rent_date}` || "Tidak Diketahui"}</h2>
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

      <div className='flex flex-col items-end justify-center mt-4 space-y-0 md:space-y-3 md:mt-0 w-full md:w-[150px] text-end'>
        <h2 className='text-color-primary text-[16px] lg:text-sm font-semibold'>Subtotal Harga</h2>
        <h2 className='text-color-primaryDark text-[18px] lg:text-[16px] font-semibold'>{formatToRupiah(rentedItemDetail.sub_total_price) || "gratis"}</h2>
      </div>
    </div>
  )
}

export default ProductInCheckoutDetail
