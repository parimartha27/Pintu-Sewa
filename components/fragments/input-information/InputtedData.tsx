interface MyComponentProps {
  label: string;
  input: string;
}
const InputtedData = ({ label, input }: MyComponentProps) => {
  return (
    <div className="flex flex-col md:flex-row max-w-[440px] md:ml-20 lg:ml-0">
      <div className="min-w-[200px] lg:min-w-[220px]">
        <h3 className="text-sm text-color-primary text-center md:text-start">{label}</h3>
      </div>
      <div className="min-w-[200px] max-w-[180px] lg:min-w-[220px]">
        <h3 className="text-sm font-semibold text-color-grayPrimary text-center md:text-start">
          {input}
        </h3>
      </div>
    </div>
  );
};

export default InputtedData;
