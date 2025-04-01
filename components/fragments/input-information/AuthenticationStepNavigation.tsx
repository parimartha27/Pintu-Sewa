const AuthenticationStepNavigation = ({ step }: { step: number }) => {
  return (
    <div className="hidden lg:flex flex-col space-y-3 px-3 xl:px-0">
      <div className="flex items-center ">
        <div className={`w-9 h-9  ${step >=1 ? 'bg-color-secondary' : 'bg-transparent border-2 border-color-primaryDark'} rounded-full ml-1`}></div>
        <div className="w-[180px] h-0.5 bg-color-secondary"></div>
        <div className={`w-9 h-9  ${step >=2 ? 'bg-color-secondary' : 'bg-transparent border-2 border-color-primaryDark'} rounded-full`}></div>
        <div className="w-[180px] h-0.5 bg-color-secondary"></div>
        <div className={`w-9 h-9  ${step == 3? 'bg-color-secondary' : 'bg-transparent border-2 border-color-primaryDark'} rounded-full`}></div>
      </div>

      <div className="flex ">
        <h3 className="text-color-primary text-sm font-medium">Biodata</h3>
        <div className="w-[164px] h-0.5"></div>
        <h3 className="text-color-primary text-sm font-medium">Alamat</h3>
        <div className="w-[164px] h-0.5"></div>
        <h3 className="text-color-primary text-sm font-medium">Konfirmasi</h3>
      </div>
    </div>
  );
};

export default AuthenticationStepNavigation;
