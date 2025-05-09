interface Props {
  message: string;
  time: string;
}

const OthersChatBox = ({ message, time }: Props) => {
  return (
    <div className="flex flex-col space-y-1 bg-color-third rounded-lg px-3 py-2 max-w-[250px] xl:max-w-[400px]">
      <h3 className="text-[#011627]">
        {message}
      </h3>
      <h4 className="text-xs text-[#011627] text-end">{time}</h4>
    </div>
  );
};

export default OthersChatBox;
