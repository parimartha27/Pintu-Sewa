import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  status: string
  className?: string
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Determine color based on status
  const getStatusStyle = () => {
    switch (status) {
      case "Belum Dibayar":
        return "bg-[#D9D9D9] text-color-primary"
      case "Diproses":
        return "bg-[#FDCC0D] text-[#590505]"
      case "Dikirim":
        return "bg-color-third text-color-primaryDark"
      case "Sedang Disewa":
        return "bg-color-secondary text-white"
      case "Dibatalkan":
        return "bg-[#BB0909] text-white"
      case "Dikembalikan":
        return "bg-[#05593E] text-white"
      case "Selesai":
        return "bg-custom-gradient-tr text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium p-2", getStatusStyle(), className)}>{status}</span>
}
