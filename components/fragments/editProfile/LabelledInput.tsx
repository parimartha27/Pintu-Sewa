"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

interface LabelledInputProps {
  label?: string;
  htmlFor: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  
  readonly?: boolean;
}

const LabelledInput = (props: LabelledInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label
        htmlFor={!props.readonly ? props.htmlFor : ""}
        className=" text-[14px] font-normal text-color-primary"
      >
        {props.label}
      </Label>
      <Input
        className={cn(
          "border-[1px] border-[#73787B] text-[#73787B] text-[12px] h-[48px] pl-4 focus:border-color-primaryDark focus:outline-none",
          props.readonly && "cursor-pointer"
        )}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readonly ? props.readonly : false}
      />
    </div>
  );
};

export default LabelledInput;
