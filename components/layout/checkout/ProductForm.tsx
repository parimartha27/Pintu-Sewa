import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import ProductInCheckoutDetail from "@/components/fragments/checkout/ProductInCheckoutDetail";
import TooltipIcon from "@/public/tooltip.svg";
import Edit from "@/public/edit.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TransactionProps } from "@/types/checkout";
import { useEffect, useState } from "react";
import { formatToRupiah } from "@/hooks/useConvertRupiah";
import CustomModal from "../modalsTemplate";
import axios from "axios";
import { checkoutBaseUrl } from "@/types/globalVar";
import Alert from "../Alert";
import { AlertProps } from "@/types/alert";
import { useAuth } from "@/hooks/auth/useAuth";

const courierOptions = [
  { id: "1", name: "JNE" },
  { id: "2", name: "TIKI" },
  { id: "3", name: "SiCepat" },
  { id: "4", name: "J&T" },
  { id: "5", name: "GoSend" },
  { id: "6", name: "GrabExpress" },
];

interface CheckoutProductFormProps {
  checkoutDetail?: TransactionProps;
  onRefresh: () => void;
}

const CheckoutProductForm = ({
  checkoutDetail,
  onRefresh,
}: CheckoutProductFormProps) => {
  const [courier, setCourier] = useState<string>(
    checkoutDetail?.shipping_partner || "Tidak Ada"
  );
  const [isCourierModalOpen, setIsCourierModalOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string>(courier);
  const [rentedItemsTransactionIds, setRentedItemsTransactionIds] = useState<
    string[]
  >([]);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const {customerId} = useAuth();

  useEffect(() => {
    if (checkoutDetail?.rented_items) {
      const transactionIds = checkoutDetail.rented_items.map(
        (item) => item.transaction_id
      );
      setRentedItemsTransactionIds(transactionIds);
    }
  }, [checkoutDetail]);

  const handleSaveCourier = async () => {
    const payload = {
      transaction_ids: rentedItemsTransactionIds,
      customer_id: customerId,
      shipping_partner_id: selectedCourier,
    };
    console.log("request edit ekspedisi payload:", payload);
    try {
      const res = await axios.patch(`${checkoutBaseUrl}/shipping`, payload);
      if (res.data.error_schema.error_message === "SUCCESS") {
        setCourier(selectedCourier);
        setIsCourierModalOpen(false);
        onRefresh();
      }
    } catch (e) {
      setAlertState({
        isOpen: true,
        message: "Gagal Mengubah Opsi Pengiriman: "+ e,
      })
    }
  };

  return (
    <>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() =>
            setAlertState({ isOpen: false, message: "", isWrong: true })
          }
          isWrong={alertState.isWrong}
        />
      )}
      <CustomModal
        isOpen={isCourierModalOpen}
        onClose={() => setIsCourierModalOpen(false)}
      >
        <div className="p-4">
          <h2 className="text-xl lg:text-2xl font-semibold mb-8 text-color-primary text-center">
            Pilih Kurir Pengiriman
          </h2>

          <div className="flex flex-col gap-2 justify-self-center min-w-[200px] max-w-[300px]">
            {courierOptions.map((option) => (
              <label
                key={option.id}
                className={`p-2 border rounded-lg cursor-pointer ${
                  selectedCourier === option.name
                    ? "border-color-primaryDark bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="courier"
                  value={option.name}
                  checked={selectedCourier === option.name}
                  onChange={() => setSelectedCourier(option.name)}
                  className="hidden"
                />
                <h3 className="text-base text-color-primaryDark text-center">
                  {option.name}
                </h3>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setIsCourierModalOpen(false)}
            >
              Batal
            </button>
            <button
              className="px-4 py-2 bg-color-primaryDark text-white rounded hover:bg-color-secondary hover:opacity-75"
              onClick={handleSaveCourier}
            >
              Simpan
            </button>
          </div>
        </div>
      </CustomModal>
      <Card className="w-full max-h-auto p-1 pt-4 shadow-lg mt-8 px-6">
        <CardHeader className="w-full flex space-x-4 items-center md:items-center pb-0 pl-0 pt-0">
          <h2 className="text-[16px] font-semibold text-color-primary pb-1">
            {checkoutDetail?.shop_name || "Nama Toko"}
          </h2>
        </CardHeader>
        <CardContent className="mt-3 flex-col p-0 ">
          {checkoutDetail?.rented_items.map((item, index) => (
            <ProductInCheckoutDetail key={index} rentedItemDetail={item} />
          ))}
          {/* <ProductInCheckoutDetail />
      <ProductInCheckoutDetail /> */}
        </CardContent>
        <CardFooter className="p-0 pt-3 pb-7 border-t-[1px] border-t-[#D9D9D9] justify-center sm:justify-end">
          <div className="flex-col max-w-[500px] w-full space-y-[14px]">
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <TooltipProvider>
                  <h3 className="text-color-primary text-[12px] md:text-sm">
                    Deposit
                  </h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src={TooltipIcon}
                        alt="tooltip"
                        className="hover:opacity-70 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border-[1px] border-color-primary rounded-sm">
                      <p className="text-[12px] text-color-secondary">
                        Uang yang disetorkan sebagai jaminan saat bertransaksi <br/>untuk kenyamaman dan keamanan bersama
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {formatToRupiah(checkoutDetail?.deposit) || "gratis"}
              </h3>
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <h3 className="text-color-primary text-[12px] md:text-sm">
                  Opsi Pengiriman
                </h3>
                <Image
                  onClick={() => setIsCourierModalOpen(true)}
                  src={Edit}
                  alt="edit"
                  className="hover:opacity-70 hover:cursor-pointer"
                />
              </div>
              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {courier}
              </h3>
            </div>
            <div className="flex justify-between">
              <h3 className="text-color-primary text-[12px] md:text-sm">
                Ongkos Kirim
              </h3>

              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {formatToRupiah(checkoutDetail?.shipping_price) || "gratis"}
              </h3>
            </div>

            <div className="flex justify-between">
              <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
                Total Produk Disewa ({" "}
                {`${checkoutDetail?.total_rented_product} Produk` ||
                  `tidak ada`}{" "}
                )
              </h3>

              <h3 className="text-color-secondary text-[14px] sm:text-[16px] lg:text-lg font-bold">
                {formatToRupiah(checkoutDetail?.total_price) || "gratis"}
              </h3>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default CheckoutProductForm;
