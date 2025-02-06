const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1280px] mx-auto">
      {children}
    </div>
  );
};

export default MainLayout;
