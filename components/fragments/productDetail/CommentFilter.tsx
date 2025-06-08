import useFilter from "@/hooks/filter/useFilter";
import TextedCheckbox from "../TextedCheckbox";
import Star from "@/public/star.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CommentFilterBody = () => {
  const { isCheckboxSelected, handleCheckboxFilter, resetAllFilters } =
    useFilter();

  return (
    <div className="flex flex-col items-start mt-4 pb-8">
      <div className="flex flex-col">
        <h2 className="pt-3 pl-4 pb-[14px] text-[16px] font-medium">Media</h2>
        <TextedCheckbox
          checked={isCheckboxSelected("hasMedia", "true")}
          onCheckedChange={() =>
            handleCheckboxFilter(
              "hasMedia",
              "true",
              !isCheckboxSelected("hasMedia", "true")
            )
          }
          className="pt-4 pl-4 pb-5"
        >
          Foto
        </TextedCheckbox>
      </div>
      <div className="flex flex-col">
        <h2 className="pt-3 pl-4 pb-[14px] text-[16px] font-medium">Rating</h2>
        <div className="flex flex-col pl-4 py-4 justify-center space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <TextedCheckbox
              checked={isCheckboxSelected("rating", rating.toString())}
              onCheckedChange={() =>
                handleCheckboxFilter(
                  "rating",
                  rating.toString(),
                  !isCheckboxSelected("rating", rating.toString())
                )
              }
              key={rating}
            >
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
        <h2 className="pt-4 pl-4 pb-[14px] text-[16px] font-medium">
          Topik Ulasan
        </h2>
        <div className="flex flex-col pt-4 pl-4 pb-5 space-y-3 mb-2">
          <TextedCheckbox
            checked={isCheckboxSelected("reviewTopics", "kondisi barang")}
            onCheckedChange={() =>
              handleCheckboxFilter(
                "reviewTopics",
                "kondisi barang",
                !isCheckboxSelected("reviewTopics", "kondisi barang")
              )
            }
          >
            Kondisi Barang
          </TextedCheckbox>
          <TextedCheckbox
            checked={isCheckboxSelected("reviewTopics", "durasi pengiriman")}
            onCheckedChange={() =>
              handleCheckboxFilter(
                "reviewTopics",
                "durasi pengiriman",
                !isCheckboxSelected("reviewTopics", "durasi pengiriman")
              )
            }
          >
            Durasi Pengiriman
          </TextedCheckbox>
        </div>
        <Button
          onClick={resetAllFilters}
          className="bg-color-primaryDark hover:bg-color-secondary max-w-[100px] ml-4"
        >
          Bersihkan
        </Button>
      </div>
    </div>
  );
};

export default CommentFilterBody;
