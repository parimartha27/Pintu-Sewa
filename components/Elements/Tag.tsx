"use client"

const Tag = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="bg-color-third px-2 py-1 rounded-sm">
      <h4 className="text-[8px] text-center text-color-primaryDark">{children}</h4>
    </div>
  );
};

export default Tag;
