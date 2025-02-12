"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import Dropdown from "@/public/dropdown.svg";
import { ChangeEvent, useState } from "react";

interface LabelledDropdownProps {
  label?: string;
  htmlFor: string;
  id: string;
  options: { value: string | number; label: string }[];
}

const LabelledDropdown = ({ label, htmlFor, id, options }: LabelledDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const [selectedLabel, setSelectedLabel] = useState(options[0].label);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find((option) => option.value === e.target.value);
    if (selectedOption) {
      setSelectedValue(selectedOption.value);
      setSelectedLabel(selectedOption.label);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={htmlFor} className="text-[14px] font-normal text-color-primary">
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          value={selectedValue}
          onChange={handleChange}
          className="appearance-none border-[1px] border-[#73787B] text-[#73787B] text-[12px] h-[48px] pl-4 pr-10 
          focus:border-color-primaryDark focus:outline-none bg-white rounded-lg w-full"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white text-[12px] text-[#2C3941] hover:bg-color-primaryDark hover:text-white px-4 py-2"
            >
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
