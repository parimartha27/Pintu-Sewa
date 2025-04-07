import { Skeleton } from "@/components/ui/skeleton";

const ReviewContentSkeleton =() => {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 items-start border-b pb-4">
          {/* Gambar produk */}
          <Skeleton className="w-32 h-20 rounded-md" />

          {/* Isi ulasan */}
          <div className="flex-1 space-y-2">
            {/* Nama produk */}
            <Skeleton className="w-40 h-4 rounded" />

            {/* User info */}
            <div className="flex items-center gap-3 mt-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-32 h-3" />
              </div>
            </div>

            {/* Isi ulasan */}
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />

            {/* Gambar review */}
            <div className="flex gap-2 pt-2">
              <Skeleton className="w-16 h-16 rounded-md" />
              <Skeleton className="w-16 h-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewContentSkeleton;
