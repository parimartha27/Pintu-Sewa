import TextedCheckbox from "../TextedCheckbox";
import Star from "@/public/star.svg";
import Image from "next/image";

const CommentFilterBody = () => {
  return (
    <div className="flex flex-col items-start mt-4">
      <div className="flex flex-col">
        <h2 className="pt-3 pl-4 pb-[14px] text-[16px] font-medium">Media</h2>
        <TextedCheckbox className="pt-4 pl-4 pb-5">Foto & Video</TextedCheckbox>
      </div>
      <div className="flex flex-col">
        <h2 className="pt-3 pl-4 pb-[14px] text-[16px] font-medium">Rating</h2>
        <div className="flex flex-col pl-4 py-4 justify-center space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <TextedCheckbox key={rating}>
              <div className="flex space-x-2 items-center">
                <Image
                  width={14}
                  height={12}
                  src={Star}
                  alt={`Star ${rating}`}
                />
                <h4 className="text-[12px] text-color-primary">{rating}</h4>
              </div>
            </TextedCheckbox>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="pt-4 pl-4 pb-[14px] text-[16px] font-medium">Topik Ulasan</h2>
        <div className="flex flex-col pt-4 pl-4 pb-5 space-y-3">
            <TextedCheckbox>Kondisi Barang</TextedCheckbox>
            <TextedCheckbox>Durasi Pengiriman</TextedCheckbox>
        </div>
        
      </div>
    </div>
  );
};

export default CommentFilterBody;
