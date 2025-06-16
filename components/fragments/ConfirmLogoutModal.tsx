"use client";

import CustomModal from "@/components/layout/modalsTemplate";
import { Button } from "@/components/ui/button";

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmLogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmLogoutModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl text-color-secondary font-bold mb-3 text-center">Logout</h2>
      <p className="text-base text-color-primary text-center mb-5">Apakah Anda yakin ingin keluar dari akun ini?</p>
      <div className="flex justify-center md:justify-end gap-2">
        <Button variant="outline" className="border border-color-primaryDark hover:bg-slate-300" onClick={onClose}>
          Batal
        </Button>
        <Button variant="destructive" className="bg-color-primaryDark hover:bg-color-secondary min-w-[70px]" onClick={() => { onConfirm(); onClose(); }}>
          Ya
        </Button>
      </div>
    </CustomModal>
  );
};

export default ConfirmLogoutModal;
