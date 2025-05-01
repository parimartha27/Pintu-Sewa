import { Skeleton } from "@/components/ui/skeleton";

export default function WalletSkeleton() {
  return (
    <main className="w-full py-8 px-4 md:px-6 pb-28">
      <div className="flex flex-col gap-8 w-full h-full">
      <h1 className='font-semibold text-color-primary text-[28px]'>My Wallet</h1>
        <div className="space-y-2 w-full">
          <div className="border rounded-lg p-6 w-full shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <Skeleton className="h-6 w-32" /> 
              <Skeleton className="h-10 w-28" /> 
            </div>
            <Skeleton className="h-10 w-60" />
          </div>
        </div>

        <div className="w-full">
          <div className="border rounded-lg p-6 w-full shadow-sm space-y-4">
            <Skeleton className="h-6 w-40" /> 

            <div className="flex justify-between px-2 text-sm font-semibold text-muted-foreground">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start border-t pt-4 px-2"
                >
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-60" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
