"use client"
interface SectionProps{
    title:string,
    children: React.ReactNode
}


const Section = ({ title, children }: SectionProps ) => {
    return (
        <div className="flex flex-col space-y-1 mt-6">
            <h3 className="text-[14px] text-color-primary">{title}</h3>
            {children}
        </div>
    );
};

export default Section;