"use client"


interface Props {
  children: React.ReactNode;
  Header: string;
}

const FilterSection = ({ children, Header }: Props) => {
  return (
    <div className="flex flex-col ">
      <h2 className="mb-3 text-[16px] text-color-primary font-medium">{Header}</h2>
      <div className="flex flex-col space-y-3">
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
