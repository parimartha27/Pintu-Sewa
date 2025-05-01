"use client"
import { Button } from "@/components/ui/button";
import CustomModal from "../modalsTemplate"

interface PaymentStepModalsProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentStepModals = ({isOpen, onClose}: PaymentStepModalsProps) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <div className="w-full space-y-8 flex flex-col items-center">
                <p className="text-lg md:text-2xl text-center text-color-secondary font-semibold px-6">Langkah Pembayaran</p>
                <ul className="font-medium space-y-2">
                    <li>1. Upload Bukti Pembayaran</li>
                    <li>2. Nyariin Tempatnya Ya?</li>
                    <li>3. Tapi Boong</li>
                    <li>4. Orang Klik Tombol Bayar Doang Kok</li>
                    <li>5. Terakhir, Teruslah Berharap Barangnya Datang, Seperti Berharap Pada Dia Yang Tak Mungkin Engkau Miliki</li>
                </ul>
                <Button className="bg-color-primaryDark hover:bg-color-secondary" onClick={onClose}>Tutup</Button>
            </div>
        </CustomModal>
    )
}

export default PaymentStepModals;