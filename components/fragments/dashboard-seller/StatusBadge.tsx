import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  status: string
  className?: string
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Determine color based on status
  const getStatusStyle = () => {
    switch (status.toLowerCase()) {
      case "belum dibayar":
        return "bg-yellow-100 text-yellow-800"
      case "sudah dibayar":
      case "active":
        return "bg-green-100 text-green-800"
      case "dibatalkan":
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusStyle(), className)}>{status}</span>
}
