import { Skeleton } from "@/components/ui/skeleton"
const AddressFormSkeleton = () => {
  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
        <Skeleton className="h-10 w-full" /> 
      </div>
    </div>
  )
}

export default AddressFormSkeleton;
