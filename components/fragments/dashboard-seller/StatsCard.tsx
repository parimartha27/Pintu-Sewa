import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type StatsCardProps = {
  title: string
  value: ReactNode
  icon?: ReactNode
  loading?: boolean
  className?: string
}

export const StatsCard = ({ title, value, icon, loading, className }: StatsCardProps) => {
  return (
    <Card className={className}>
      <CardContent className='pt-4'>
        <p className='text-sm text-gray-500'>{title}</p>
        {loading ? (
          <div className='flex items-center space-x-2 mt-1'>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span className='text-gray-500'>Loading...</span>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            {icon}
            <h3 className={cn('text-xl font-bold',className)}>{value}</h3>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
