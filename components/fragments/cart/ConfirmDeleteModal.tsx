"use client";

import CustomModal from "@/components/layout/modalsTemplate";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl text-color-secondary font-bold mb-3 text-center">Hapus Item</h2>
      <p className="text-base text-color-primary text-center mb-5">Apakah Anda yakin ingin menghapus produk dari keranjang?</p>
      <div className="flex justify-center md:justify-end gap-2">
        <Button variant="outline" className="border border-color-primaryDark hover:bg-slate-300" onClick={onClose}>
          Batal
        </Button>
        <Button variant="destructive" className="bg-color-primaryDark hover:bg-color-secondary" onClick={() => { onConfirm(); onClose(); }}>
          Hapus
        </Button>
      </div>
    </CustomModal>
  );
};

export default ConfirmDeleteModal;
