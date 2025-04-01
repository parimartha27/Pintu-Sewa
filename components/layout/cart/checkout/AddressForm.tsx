"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Edit from "@/public/edit.svg";
import Location from "@/public/location.svg";
import { useRouter } from "next/navigation";

const AddressForm = () => {
  const router = useRouter();
  return (
    <Card className="w-full  max-h-auto p-1 pt-4 shadow-lg border-0 outline-none">
      <CardHeader className="w-full flex flex-col sm:flex-row items-start md:items-center justify-between py-0 ">
        <h2 className="text-[16px] font-semibold text-color-primary">
          Alamat Pengiriman
        </h2>

        <Button
          onClick={() => router.push("/profile/edit-address")}
          className="w-[80px] h-[32px] flex items-center bg-transparent hover:bg-slate-200 border-[1px] border-color-secondary rounded-sm"
        >
          <Image
            src={Edit}
            alt="edit"
            width={27}
            height={20}
            className="mt-1"
          />
          <h4 className="text-color-secondary text-[12px]">Edit</h4>
        </Button>
      </CardHeader>
      <CardContent className="mt-3">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-[8px] items-start">
            <Image
              src={Location}
              width={13.77}
              height={17}
              alt="location"
              className="mt-1 md:mt-1.5"
            />
            <h2 className="text-color-secondary font-medium text-sm md:text-lg">
              Kos Naturale N2/12 - Putu Agus Parimartha
            </h2>
          </div>
          <h4 className="text-[10px] md:text-sm font-normal text-color-primary">
            Jalan Raya Foresta, Cluster Naturale N2/12, Kecamatan Pagedangan,
            Kabupaten Tangerang, Provinsi Banten 15539 - 081529518909
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
