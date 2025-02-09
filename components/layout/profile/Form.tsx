"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Edit from "@/public/edit.svg";
import Image from "next/image";

interface EditProfileProps {
  title: string;
  iconName?: string;
  children?: React.ReactNode;
}

const EditProfileForm = ({ title, iconName, children }: EditProfileProps) => {
  return (
<Card className="w-full max-w-[1000px] max-h-[350px] px-6">
<CardHeader className="flex items-center justify-between w-full border-b-[1px] border-b-[#D9D9D9] px-0 pb-4">
  <h2 className="text-[18px] font-semibold text-color-primary">{title}</h2>
  {iconName && (
    <Button className="flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark">
      <Image src={Edit} alt="edit" width={18} height={18} className="mt-1" />
      <h4 className="text-color-primaryDark text-[12px]">{iconName}</h4>
    </Button>
  )}
  
</CardHeader>
  <CardContent className="p-0">{children}</CardContent>
</Card>
  );
};

export default EditProfileForm;
