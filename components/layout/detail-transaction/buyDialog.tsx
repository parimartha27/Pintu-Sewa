// components/layout/detail-transaction/BuyProductDialog.tsx

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran"

import BCA from "@/public/BCA.svg"
import BRI from "@/public/BRI.svg"
import BNI from "@/public/BNI.svg"

interface BuyProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productInfo: { product_name: string; amount_to_pay: number } | null
  isLoading: boolean
  selectedMethod: string
  onSelectMethod: (method: string) => void
  onSubmit: () => void
}

const paymentMethods = [
  { name: "BCA Virtual Account", image: BCA.src },
  { name: "BRI Virtual Account", image: BRI.src },
  { name: "BNI Virtual Account", image: BNI.src },
]

export function BuyProductDialog({ open, onOpenChange, productInfo, isLoading, selectedMethod, onSelectMethod, onSubmit }: BuyProductDialogProps) {
  if (!productInfo) return null

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Formulir Pembelian Barang</DialogTitle>
          <DialogDescription>Selesaikan pembayaran untuk membeli produk {productInfo.product_name}. Pastikan detail di bawah ini sudah benar.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-6 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='amount'
              className='text-right'
            >
              Jumlah Bayar
            </Label>
            <Input
              id='amount'
              value={formatCurrency(productInfo.amount_to_pay)}
              readOnly
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-start gap-4'>
            <Label className='text-right pt-2'>Metode Bayar</Label>
            <div className='col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {paymentMethods.map((method) => (
                <MetodePembayaranFragments
                  key={method.name}
                  nama={method.name}
                  gambar={method.image}
                  isSelected={selectedMethod === method.name}
                  onSelect={() => onSelectMethod(method.name)}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!selectedMethod || isLoading}
          >
            {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            Bayar Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
