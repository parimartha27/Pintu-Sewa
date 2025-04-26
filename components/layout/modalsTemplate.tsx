"use client";

import { ReactNode, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal = ({ isOpen, onClose, children }: CustomModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <Card className="relative z-10 w-[90%] max-w-md p-4 shadow-xl rounded-2xl">
        <CardContent className="p-4">{children}</CardContent>
      </Card>
    </div>
  );
};

export default CustomModal;


// "use client";

// import { useState } from "react";
// import CustomModal from "@/components/ui/CustomModal";
// import { Button } from "@/components/ui/button";

// const ExamplePage = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpen(true)}>Open Modal</Button>
//       <CustomModal isOpen={open} onClose={() => setOpen(false)}>
//         <h2 className="text-xl font-semibold mb-2">Judul Modal</h2>
//         <p>Ini konten modals yang kamu minta.</p>
//         <Button className="mt-4" onClick={() => setOpen(false)}>
//           Tutup
//         </Button>
//       </CustomModal>
//     </>
//   );
// };

// export default ExamplePage;
