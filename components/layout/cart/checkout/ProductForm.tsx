import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const ProductForm = () => {
    return(<Card className="w-full max-w-[827px] max-h-auto p-1 pt-4 shadow-lg border-0 outline-none mt-8 px-6">
        <CardHeader className="w-full flex flex-col sm:flex-row items-start md:items-center justify-between pb-3 pl-0 pt-2 border-b-[1px] border-b-[#D9D9D9]">
          <h2 className="text-[16px] font-semibold text-color-primary">
            Nama Toko
          </h2>

        </CardHeader>
        <CardContent className="mt-3">
         
        </CardContent>
      </Card>);
}

export default ProductForm;