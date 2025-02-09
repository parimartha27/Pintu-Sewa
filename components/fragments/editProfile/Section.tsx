"use client"
import { cn } from "@/lib/utils"

interface SectionProps{
    title:string,
    className?: string
    children: React.ReactNode
}


const Section = ({ title, children, className}: SectionProps ) => {
    return (
        <div className= {cn("flex flex-col space-y-1 mt-6 ",className )}>
            <h3 className="text-[14px] text-color-primary">{title}</h3>
            {children}
        </div>
    );
};

export default Section;