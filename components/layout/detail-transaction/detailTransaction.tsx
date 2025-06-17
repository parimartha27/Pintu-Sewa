"use client";

import { useState } from "react"
import axios, { AxiosError } from "axios"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/auth/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { transactionBaseUrl, reviewBaseUrl, trackingBaseUrl, checkoutBaseUrl } from "@/types/globalVar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ReviewDialog } from "@/components/layout/detail-transaction/reviewDialog"
import { BuyProductDialog } from "@/components/layout/detail-transaction/buyDialog"
import { usePathname } from "next/navigation";

interface TransactionResponse {
  transaction_detail: {
    reference_number: string;
    status: string;
    transaction_date: string;
    shipping_address: string;
    shipping_partner: string;
    shipping_code: string | null;
    return_code: string;
  };
  product_details: Array<{
    order_id: string;
    product_id: string;
    product_name: string;
    image: string;
    start_rent_date: string;
    end_rent_date: string;
    quantity: number;
    price: number;
    sub_total: number;
    deposit: number;
  }>;
  payment_detail: {
    payment_method: string;
    sub_total: number;
    shipping_price: number;
    service_fee: number;
    total_deposit: number;
    grand_total: number;
  };
  shop_detail: {
    id: string;
    name: string;
  };
}

interface TransactionDetailContentProps {
  transactionData: TransactionResponse;
  role: "customer" | "seller";
  reFetchData: () => void;
}

interface CheckPaymentAmountResponse {
  product_name: string
  amount_to_pay: number
}

const api = axios.create({ baseURL: transactionBaseUrl })
const reviewApi = axios.create({ baseURL: reviewBaseUrl })
const checkoutApi = axios.create({ baseURL: checkoutBaseUrl })

type PaymentPayload = {
  reference_numbers: string[];
  payment_method: string;
  customer_id: string;
  amount: number;
};
type ShippingPayload = { reference_number: string; shipping_code: string };
type ReturnPayload = { reference_number: string; return_code: string };
type BasicPayload = { reference_number: string };
type DonePayload = { reference_number: string; customer_id: string };
type CancelPayload = { reference_number: string };

const handleApiCall = async (request: Promise<any>) => {
  const response = await request;
  if (response.data?.error_schema?.error_code !== "PS-00-000") {
    throw new Error(
      response.data?.error_schema?.error_message ||
        "Terjadi kesalahan pada server."
    );
  }
  return response.data;
};

const apiService = {
  payment: (payload: PaymentPayload) =>
    handleApiCall(api.patch("/transaction-detail/payment", payload)),
  ship: (payload: ShippingPayload) =>
    handleApiCall(api.patch("/transaction-detail/set-shipping", payload)),
  receive: (payload: BasicPayload) =>
    handleApiCall(api.patch("/transaction-detail/receive-item", payload)),
  return: (payload: ReturnPayload) =>
    handleApiCall(api.patch("/transaction-detail/return-item", payload)),
  done: (payload: DonePayload) =>
    handleApiCall(api.patch("/transaction-detail/done", payload)),
  cancel: (payload: CancelPayload) =>
    handleApiCall(api.patch("/transaction-detail/cancelled", payload)),

  track: (
    refNum: string,
    idPayload: { customer_id?: string; shop_id?: string }
  ) => {
    console.log(
      "TODO: Implement tracking API call",
      `${trackingBaseUrl}/lacak-produk/${refNum}`,
      idPayload
    );
    return Promise.resolve();
  },
  checkPaymentAmount: (payload: { customer_id: string; product_id: string; reference_number: string; transaction_id: string }) => handleApiCall(checkoutApi.post("/check-payment-amount", payload)),

  buyProduct: (payload: { customer_id: string; product_id: string; reference_number: string; transaction_id: string; amount_payment: number; payment_method: string }) => handleApiCall(checkoutApi.post("/buy-product", payload)),

  addReview: (payload: FormData) => {
    return handleApiCall(
      reviewApi.post("/add", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
};

export function TransactionDetailContent({
  transactionData,
  role,
  reFetchData,
}: TransactionDetailContentProps) {
  const { customerId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isTransactionHistory = pathname.includes("transaction-history");
  const shopId =
    typeof window !== "undefined" ? localStorage.getItem("shopId") : null;

  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const [showReturnForm, setShowReturnForm] = useState<boolean>(false);
  const [showShippingForm, setShowShippingForm] = useState<boolean>(false);
  const [isReviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  const [returnCode, setReturnCode] = useState<string>("")
  const [shippingCode, setShippingCode] = useState<string>("")
  const [isBuyProductDialogOpen, setBuyProductDialogOpen] = useState<boolean>(false)
  const [buyProductInfo, setBuyProductInfo] = useState<CheckPaymentAmountResponse | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")

  const { transaction_detail, product_details, payment_detail, shop_detail } =
    transactionData;
  const status = transaction_detail.status;
  const refNum = transaction_detail.reference_number;

  const performAction = async (
    action: Promise<any>,
    successMessage: string
  ) => {
    setLoadingAction(true);
    try {
      await action;
      toast(successMessage);
      reFetchData();
    } catch (error) {
      const err = error as AxiosError<{
        error_schema: { error_message: string };
      }>;
      const errorMessage =
        err.response?.data?.error_schema?.error_message ||
        "Gagal melakukan aksi.";
      toast(errorMessage);
    } finally {
      setLoadingAction(false);
      setReviewDialogOpen(false);
      setShowReturnForm(false);
      setShowShippingForm(false);
    }
  };

  const handlePayment = () => {
    if (!customerId) return;
    const payload: PaymentPayload = {
      reference_numbers: [refNum],
      payment_method: payment_detail.payment_method,
      customer_id: customerId,
      amount: payment_detail.grand_total,
    };
    performAction(
      apiService.payment(payload),
      "Pembayaran berhasil, transaksi sedang diproses."
    );
  };

  const handleReceiveItem = () => {
    performAction(
      apiService.receive({ reference_number: refNum }),
      "Konfirmasi penerimaan barang berhasil."
    );
  };

  const handleReturnItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnCode) return;
    const payload = { reference_number: refNum, return_code: returnCode };
    performAction(
      apiService.return(payload),
      "Formulir pengembalian telah dikirim."
    );
  };

  const handleShipItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingCode) return;
    const payload = { reference_number: refNum, shipping_code: shippingCode };
    performAction(
      apiService.ship(payload),
      "Status transaksi berhasil diubah menjadi 'Dikirim'."
    );
  };

  const handleCancelTransaction = () => {
    const payload = { reference_number: refNum };
    performAction(apiService.cancel(payload), "Transaksi telah dibatalkan.");
  };

  const handleDoneTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      toast("Customer ID tidak ditemukan untuk transaksi ini.");
      return;
    }
    const payload = { reference_number: refNum, customer_id: customerId };
    performAction(apiService.done(payload), "Transaksi telah selesai.");
  };

  const handleTrackProduct = () => {
    localStorage.setItem(
      "seller_refference_number",
      transactionData.transaction_detail.reference_number
    );

    if (isTransactionHistory) {
      router.push("/dashboard-seller/transaction-history/track-order");
    } else {
      router.push("/order-history/lacak-produk");
    }
  };

  const handleBuyProduct = async () => {
    if (!customerId) {
      toast.error("Customer ID tidak ditemukan, silakan login ulang.")
      return
    }

    setLoadingAction(true)
    try {
      const payload = {
        customer_id: customerId,
        product_id: product_details[0].product_id,
        reference_number: refNum,
        transaction_id: product_details[0].order_id,
      }

      const response = await apiService.checkPaymentAmount(payload)

      console.log("ini data", response)
      const data: CheckPaymentAmountResponse = response.output_schema

      setBuyProductInfo({
        product_name: data.product_name,
        amount_to_pay: data.amount_to_pay,
      })
      setBuyProductDialogOpen(true)
    } catch (error) {
      const err = error as AxiosError<{ error_schema: { error_message: string } }>
      const errorMessage = err.response?.data?.error_schema?.error_message || "Gagal mengambil detail pembelian."
      toast.error(errorMessage)
    } finally {
      setLoadingAction(false)
    }
  }

  const handleSubmitBuyProduct = () => {
    if (!customerId || !buyProductInfo) return

    const payload = {
      customer_id: customerId,
      product_id: product_details[0].product_id,
      reference_number: refNum,
      transaction_id: product_details[0].order_id,
      amount_payment: buyProductInfo.amount_to_pay,
      payment_method: selectedPaymentMethod,
    }

    performAction(apiService.buyProduct(payload), "Pembelian berhasil! Transaksi Anda akan diperbarui.").then(() => {
      setBuyProductDialogOpen(false)
      setBuyProductInfo(null)
      setSelectedPaymentMethod("")
    })
  }

  const handleSubmitRating = (payload: {
    rating: number;
    comment: string;
    image?: File;
  }) => {
    if (!customerId) {
      toast.error("Customer ID tidak ditemukan, silakan login ulang.");
      return;
    }

    const formData = new FormData();
    formData.append("customerId", customerId);
    formData.append("rating", payload.rating.toString());
    formData.append("comment", payload.comment);

    product_details.forEach((product) => {
      formData.append("productIds", product.product_id);
    });

    if (payload.image) {
      formData.append("image", payload.image);
    }

    performAction(
      apiService.addReview(formData),
      "Ulasan Anda berhasil dikirim! Terima kasih."
    );
  };

  const isCustomer = role === "customer";
  const isSeller = role === "seller";

  return (
    <div className="w-full">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex-col gap-4">
            <h1 className="text-xl font-bold pb-4 border-b-[1px] border-[#D9D9D9]">
              Detail Transaksi
            </h1>
            <div className="flex-col pt-6 space-y-3 ">
              <div className="flex justify-between">
                <p className="text-sm text-primary">Nomor Referensi</p>
                <p className="font-semibold text-lg">
                  {transaction_detail.reference_number}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-primary">Status Transaksi</p>
                <Badge
                  className={`p-2 ${
                    status === "Belum Dibayar"
                      ? " bg-[#D9D9D9] text-color-primary"
                      : ""
                  } ${
                    status === "Diproses" ? "bg-[#FDCC0D] text-[#590505]" : ""
                  } ${
                    status === "Dikirim"
                      ? "bg-color-third text-color-primaryDark"
                      : ""
                  } ${
                    status === "Sedang Disewa"
                      ? "bg-color-secondary text-white"
                      : ""
                  } ${
                    status === "Dibatalkan" ? "bg-[#BB0909] text-white" : ""
                  } ${
                    status === "Dikembalikan" ? "bg-[#05593E] text-white" : ""
                  } ${
                    status === "Selesai"
                      ? "bg-custom-gradient-tr text-white"
                      : ""
                  }`}
                >
                  {transaction_detail.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-primary">Tanggal Penyewaan</p>
                <p className="font-medium">
                  {transaction_detail.transaction_date}
                </p>
              </div>
              {transaction_detail.shipping_address && (
                <div className="flex justify-between">
                  <p className="text-sm text-primary">Alamat Pengiriman</p>
                  <p className="font-medium">
                    {transaction_detail.shipping_address}
                  </p>
                </div>
              )}
              {transaction_detail.shipping_code && (
                <div className="flex justify-between">
                  <p className="text-sm text-primary">Kode Pengiriman</p>
                  <p className="font-medium">
                    {transaction_detail.shipping_code}
                  </p>
                </div>
              )}
              {transaction_detail.return_code && (
                <div className="flex justify-between">
                  <p className="text-sm text-primary">Kode Pengembalian</p>
                  <p className="font-medium">
                    {transaction_detail.return_code}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="">
          <div className="flex border-b-[1px] border-[#D9D9D9] w-full justify-between pb-4">
            <h1 className="text-xl font-bold">Detail Barang</h1>
            {!shopId && (
              <div className="flex space-x-2 items-center justify-between">
                <p>{shop_detail.name}</p>
                <Link href={`/chat`}>
                  <Button variant="outline" size="sm">
                    Chat Toko
                  </Button>
                </Link>
                <Link href={`/shop/${shop_detail.id}`}>
                  <Button variant="outline" size="sm">
                    Kunjungi Toko
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {product_details.map((product, index) => (
            <div key={product.order_id} className="my-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.product_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium">{product.product_name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.start_rent_date} - {product.end_rent_date}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.quantity} barang x{" "}
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {index < product_details.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold pb-4 border-b-[1px] border-[#D9D9D9] w-full">
            Rincian Pembayaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Metode Pembayaran</span>
              <span className="font-medium">
                {payment_detail.payment_method === "Pintu_Sewa_Wallet"
  ? "Pintu Sewa Wallet"
  : payment_detail.payment_method}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal Harga Barang</span>
              <span>{formatCurrency(payment_detail.sub_total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Ongkos Kirim</span>
              <span>{formatCurrency(payment_detail.shipping_price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biaya Layanan</span>
              <span>{formatCurrency(payment_detail.service_fee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Deposit</span>
              <span>{formatCurrency(payment_detail.total_deposit)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total Transaksi</span>
              <span>{formatCurrency(payment_detail.grand_total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {loadingAction && (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Memproses...
        </div>
      )}

      {/* === CUSTOMER VIEW === */}
      {isCustomer && status === "Belum Dibayar" && (
        <Button className="bg-custom-gradient-tr" onClick={handlePayment}>
          Bayar Sekarang
        </Button>
      )}
      {isCustomer && status === "Dikirim" && (
        <div className="flex gap-2">
          <Button className="bg-custom-gradient-tr" onClick={handleReceiveItem}>
            Barang Diterima
          </Button>
          <Button
            onClick={handleTrackProduct}
            className="border-2 border-color-primaryDark bg-white text-color-primaryDark
             hover:bg-slate-300 "
          >
            Lacak Produk
          </Button>
        </div>
      )}
      {isCustomer && status === "Sedang Disewa" && !showReturnForm && (
        <div className="flex gap-2">
          <Button
            className="bg-custom-gradient-tr"
            onClick={() => setShowReturnForm(true)}
          >
            Kembalikan Barang
          </Button>
          <Button
            onClick={handleBuyProduct}
            disabled={loadingAction}
            className='border-2 border-color-primaryDark bg-white text-color-primaryDark
                   hover:bg-slate-300 '
          >
            {loadingAction && !isBuyProductDialogOpen ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            Beli Barang
          </Button>
        </div>
      )}
      {isCustomer && status === "Selesai" && (
        <>
          <Button
            className="bg-custom-circle-gradient-br"
            onClick={() => setReviewDialogOpen(true)}
          >
            Beri Rating
          </Button>
          <ReviewDialog
            open={isReviewDialogOpen}
            onOpenChange={setReviewDialogOpen}
            onSubmit={handleSubmitRating}
            productNames={product_details.map((p) => p.product_name)}
            isLoading={loadingAction}
          />
        </>
      )}

      {/* === SELLER VIEW === */}
      {isSeller && status === "Diproses" && !showShippingForm && (
        <div className="flex gap-2">
          <Button
            onClick={() => setShowShippingForm(true)}
            className="bg-custom-gradient-tr"
          >
            Kirim Pesanan
          </Button>
          <Button
            onClick={handleCancelTransaction}
            className="border-2 border-red-600 bg-white text-red-800 outline-none hover:bg-red-600 hover:text-white"
          >
            Batalkan Pesanan
          </Button>
        </div>
      )}
      {isSeller && status === "Dikirim" && (
        <Button className="bg-custom-gradient-tr" onClick={handleTrackProduct}>
          Lacak Produk
        </Button>
      )}
      {isSeller && status === "Dikembalikan" && (
        <div className="flex-row space-x-4">
          <Button
            onClick={handleDoneTransaction}
            className="bg-custom-gradient-tr"
          >
            Barang Diterima
          </Button>

          <Button
            className="border-2 border-color-primaryDark bg-white text-color-primaryDark
             hover:bg-slate-300 "
            onClick={handleTrackProduct}
          >
            Lacak Produk
          </Button>
        </div>
      )}

      {/* === CONDITIONAL FORMS === */}
      {isCustomer && showReturnForm && (
        <form
          onSubmit={handleReturnItem}
          className="p-4 border rounded-md space-y-4"
        >
          <CardTitle>Formulir Pengembalian</CardTitle>
          <Input
            value={returnCode}
            onChange={(e) => setReturnCode(e.target.value)}
            placeholder="Masukkan nomor resi pengembalian"
            required
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              className="border-2 border-red-600 bg-white text-red-800 outline-none hover:bg-red-600 hover:text-white"
              onClick={() => setShowReturnForm(false)}
            >
              Batal
            </Button>
            <Button className="bg-custom-gradient-tr" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}

      {isSeller && showShippingForm && (
        <form
          onSubmit={handleShipItem}
          className="p-4 border rounded-md space-y-4"
        >
          <CardTitle>Formulir Pengiriman</CardTitle>
          <Input
            value={shippingCode}
            onChange={(e) => setShippingCode(e.target.value)}
            placeholder="Masukkan nomor resi pengiriman"
            required
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              className="border-2 border-red-600 bg-white text-red-800 outline-none hover:bg-red-600 hover:text-white"
              onClick={() => setShowShippingForm(false)}
            >
              Batal
            </Button>
            <Button className="bg-custom-gradient-tr" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
      <BuyProductDialog
        open={isBuyProductDialogOpen}
        onOpenChange={setBuyProductDialogOpen}
        productInfo={buyProductInfo}
        isLoading={loadingAction}
        selectedMethod={selectedPaymentMethod}
        onSelectMethod={setSelectedPaymentMethod}
        onSubmit={handleSubmitBuyProduct}
      />
    </div>
  );
}
