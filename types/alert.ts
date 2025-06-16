export interface AlertProps {
  isOpen: boolean
  message: string
  isWrong?: boolean
  needImage?: boolean
  buttonMessage?: string
  onClose?: () => void
}
