interface Props {
  children: React.ReactNode;
  Header: string;
}

const FilterSection = ({ children, Header }: Props) => {
  return (
    <div className="flex flex-col p-4">
      <h2 className="mb-6 text-[16px] font-medium">{Header}</h2>
      <div className="flex flex-col space-y-3">
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
