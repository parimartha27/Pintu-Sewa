// components/ui/star-rating.tsx
"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  setRating: (rating: number) => void
  size?: number
  className?: string
}

export function StarRating({ rating, setRating, size = 24, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            "cursor-pointer transition-colors",
            rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  )
}