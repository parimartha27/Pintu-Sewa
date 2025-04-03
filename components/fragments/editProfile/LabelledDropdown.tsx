"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import Dropdown from "@/public/dropdown.svg";
import { ChangeEvent } from "react";

interface LabelledDropdownProps {
  label?: string;
  htmlFor: string;
  id: string;
  options: { value: string | number; label: string }[];
  value: string | number; // ✅ Tambahkan value agar bisa dikontrol dari parent
  onValueChange: (value: string | number) => void; // ✅ Tambahkan event handler
  disabled?: boolean;
}

const LabelledDropdown = ({
  label,
  htmlFor,
  id,
  options,
  value,
  onValueChange,
  disabled = false,
}: LabelledDropdownProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value); // Langsung kirim nilai yang dipilih
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <Label htmlFor={htmlFor} className="text-[14px] font-normal text-color-primary">
          {label}
        </Label>
      )}
      <div className="relative">
        <select
          id={id}
          value={String(value)} 
          onChange={handleChange}
          disabled={disabled}
          className="appearance-none border-[1px] border-[#73787B] text-[#73787B] text-[12px] h-[48px] pl-4 pr-10 
          focus:border-color-primaryDark focus:outline-none bg-white rounded-lg w-full"
        >
          {options.map((option) => (
            <option key={option.value} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-[18px] top-1/2 -translate-y-1/2 pointer-events-none">
          <Image src={Dropdown} width={18} height={10.36} alt="dropdown" />
        </div>
      </div>
    </div>
  );
};

export default LabelledDropdown;
