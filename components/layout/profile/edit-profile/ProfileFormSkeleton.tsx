import { Skeleton } from "@/components/ui/skeleton";

const ProfileFormSkeleton = () => {
  return (
    <div className="w-full px-2 md:px-0 py-10 space-y-6">
    <h2 className="text-[16px] md:text-[18px] font-semibold text-color-primary">
      Edit Informasi Personal
    </h2>

    <div className="flex flex-col lg:flex-row-reverse space-y-6 lg:space-y-0 lg:space-x-8 lg:space-x-reverse">
      <div className="flex flex-col items-center space-y-4 w-full lg:w-1/2">
        <Skeleton className="rounded-full h-36 w-36" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <div className="space-y-1 text-center">
          <Skeleton className="h-4 w-56 mx-auto" />
          <Skeleton className="h-4 w-44 mx-auto" />
        </div>
      </div>

      <div className="flex flex-col space-y-6 w-full lg:w-1/2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-12 w-52" /> 
      </div>
    </div>
  </div>
  );
};

export default ProfileFormSkeleton;
