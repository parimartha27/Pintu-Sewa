"use client"
import { Button } from "@/components/ui/button"
import CustomModal from "../modalsTemplate"

interface PaymentStepModalsProps {
  isOpen: boolean
  onClose: () => void
}

const PaymentStepModals = ({ isOpen, onClose }: PaymentStepModalsProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='w-full space-y-8 flex flex-col items-center'>
        <p className='text-lg md:text-2xl text-center text-color-secondary font-semibold px-6'>Langkah Pembayaran</p>
        <ul className='font-medium space-y-2'>
          <li>1. Pilih metode pembayaran Virtual Account</li>
          <li>2. Catat/salin nomor Virtual Account yang ditampilkan</li>
          <li>3. Buka aplikasi mobile banking/e-banking Anda</li>
          <li>4. Masukkan nomor Virtual Account tujuan</li>
          <li>5. Pastikan nominal transfer sesuai dengan tagihan</li>
          <li>6. Konfirmasi dan selesaikan pembayaran</li>
          <li>7. Tunggu konfirmasi otomatis (biasanya dalam 1-3 menit)</li>
          <li>8. Saldo akan otomatis terupdate di akun Anda</li>
        </ul>
        <Button
          className='bg-color-primaryDark hover:bg-color-secondary'
          onClick={onClose}
        >
          Tutup
        </Button>
      </div>
    </CustomModal>
  )
}

export default PaymentStepModals
