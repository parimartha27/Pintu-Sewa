import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  status: string
  className?: string
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Belum Dibayar":
        return "bg-gray-200 text-gray-700"
      case "Diproses":
        return "bg-yellow-200 text-yellow-800"
      case "Dikirim":
        return "bg-blue-200 text-blue-800"
      case "Sedang Disewa":
        return "bg-color-primaryDark text-white"
      case "Dikembalikan":
        return "bg-green-200 text-green-800"
      case "Dibatalkan":
        return "bg-red-200 text-red-800"
      case "Selesai":
        return "bg-custom-gradient-tr text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return <span className={cn("px-2 py-1 rounded-md text-xs", getStatusBadgeClass(status), className)}>{status}</span>
}
