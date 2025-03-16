interface MyComponentProps {
  label: string;
  input: string;
}
const InputtedData = ({ label, input }: MyComponentProps) => {
  return (
    <div className="flex max-w-[440px]">
      <div className="min-w-[220px]">
        <h3 className="text-sm text-color-primary">{label}</h3>
      </div>
      <div className="min-w-[220px]">
        <h3 className="text-sm font-semibold text-color-grayPrimary">
          {input}
        </h3>
      </div>
    </div>
  );
};

export default InputtedData;
