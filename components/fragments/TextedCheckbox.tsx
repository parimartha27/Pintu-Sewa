import { Checkbox } from "@/components/ui/checkbox";

interface Props {
    children: React.ReactNode;
}


const TextedCheckbox = ({children} : Props) => {
  return (
    <div className="flex space-x-3 items-center">
      <Checkbox />
      <h4 className="text-[12px] text-color-primary">{children}</h4>
    </div>
  );
};

export default TextedCheckbox;
