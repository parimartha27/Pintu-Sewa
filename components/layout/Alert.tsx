import CustomModal from "./modalsTemplate";
import Image from "next/image";
import Alert from "@/public/alertRed.svg";
import { Button } from "../ui/button";
import Confirm from "@/public/alertConfirm.svg";

interface AlertLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isWrong?: boolean;
  buttonMessage?: string;
  needImage?: boolean;
}

const AlertLayout = ({
  isOpen,
  onClose,
  message,
  isWrong = true,
  buttonMessage = "Tutup",
  needImage = true,
}: AlertLayoutProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      {needImage && (
        <Image
          className="mx-auto py-8"
          src={isWrong ? Alert : Confirm}
          alt="alert"
          width={100}
          height={100}
        />
      )}
      <h2 className="text-base md:text-xl text-center text-color-primary font-semibold pb-8">
        {message}
      </h2>
      <div className="flex w-full justify-center">
        <Button
          className="bg-color-primaryDark hover:bg-color-secondary hover:opacity-90"
          onClick={onClose}
        >
          {buttonMessage}
        </Button>
      </div>
    </CustomModal>
  );
};

export default AlertLayout;
