"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string
}


const TextedCheckbox = ({children, className} : Props) => {
  return (
    <div className={cn("flex space-x-3 items-center", className)}>
      <Checkbox />
      <h4 className="text-[12px] text-color-primary">{children}</h4>
    </div>
  );
};

export default TextedCheckbox;
