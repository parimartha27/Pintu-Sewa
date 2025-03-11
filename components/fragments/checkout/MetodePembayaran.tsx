import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

interface MetodePembayaranFragmentsProps {
  nama: string;
  gambar: string;
}

const MetodePembayaranFragments = ({
  nama,
  gambar,
}: MetodePembayaranFragmentsProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between  ">
      <RadioGroup defaultValue="option-one" className="flex space-x-6 mt-1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="laki-laki" id="option-one" />
          <Label
            htmlFor="option-one"
            className="text-[12px] text-color-primary font-medium"
          >
            {nama}
          </Label>
        </div>
      </RadioGroup>
      <Image
        src={gambar}
        alt="bca"
        className="w-1/2 max-w-[100px] mt-3 h-12 "
      />
    </div>
  );
};

export default MetodePembayaranFragments;
