"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const TextedCheckbox = ({ children, className, checked, onCheckedChange }: Props) => {
  return (
    <div className={cn("flex space-x-3 items-center", className)}>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <h4 className="text-[12px] text-color-primary">{children}</h4>
    </div>
  );
};

export default TextedCheckbox;
