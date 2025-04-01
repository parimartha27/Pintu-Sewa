const RightCircleBackgroundLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-color-third px-2 overflow-hidden">
      <div className="bg-custom-circle-gradient-br w-5/6 rounded-full h-[170%] absolute -right-1/4 top-1/2 -translate-y-1/2"></div>
      {children}
    </main>
  );
};

export default RightCircleBackgroundLayout;
