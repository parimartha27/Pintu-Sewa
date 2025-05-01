import { useState } from "react"
import Image from "next/image"
import Guest from "@/public/guest.svg"
import Star from "@/public/star.svg"
import RegisterImage from "@/public/register.svg"
import { ReviewProps } from "@/types/review"
import { X } from "lucide-react" // icon silang

const UserReview = ({ reviewDetail }: { reviewDetail: ReviewProps }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className='flex flex-col space-y-1'>
        <div className='flex space-x-3'>
          <Image
            width={40}
            height={40}
            src={reviewDetail.user_profile || Guest}
            alt='guest'
            className='w-8 h-8 lg:w-10 lg:h-10 rounded-full object-fit'
          />
          <div className='flex flex-col'>
            <h2 className='text-[12px] lg:text-[16px] text-color-primary font-medium lg:font-semibold'>{reviewDetail.username}</h2>
            <div className='flex space-x-2'>
              <div className='flex space-x-1 py-1'>
                {[...Array(Math.floor(reviewDetail.rating || 0))].map((_, i) => (
                  <Image
                    key={i}
                    src={Star}
                    alt='star'
                    className='w-2 h-2 lg:w-[14px] lg:h-[12.73px]'
                  />
                ))}
              </div>
              <h3 className='text-[10px] lg:text-xs text-color-primary mt-1 '>{reviewDetail.created_at}</h3>
            </div>
          </div>
        </div>

        <h4 className='w-full text-start text-color-primary text-[10px] lg:text-sm py-2'>{reviewDetail.comment}</h4>

        <div className='flex space-x-2'>
          {Array.isArray(reviewDetail.images) &&
            reviewDetail.images.map((src, index) => (
              <Image
                key={index}
                src={RegisterImage.src}
                // src={src || RegisterImage.src}
                alt={`review-image-${index}`}
                width={60}
                height={60}
                className='w-8 h-8 lg:w-[60px] lg:h-[60px] rounded-md bg-amber-300 cursor-pointer object-cover'
                onClick={() => setSelectedImage(src)}
              />
            ))}
        </div>
      </div>

      {selectedImage && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center'>
          <div className='relative w-[90vw] h-[90vh]'>
            <button
              className='absolute top-2 right-2 z-50 bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition'
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>

            <Image
              src={selectedImage}
              alt='fullscreen-review-image'
              fill
              className='object-contain rounded-md'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default UserReview
