"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { StarRating } from "@/components/ui/star-rating"

interface ReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: { rating: number; comment: string; image?: File }) => void
  productNames: string[]
  isLoading: boolean
}

export function ReviewDialog({ open, onOpenChange, onSubmit, productNames, isLoading }: ReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [image, setImage] = useState<File | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Rating tidak boleh kosong.")
      return
    }
    setError(null)
    onSubmit({ rating, comment, image })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Beri Ulasan Anda</DialogTitle>
          <DialogDescription>Ulasan Anda untuk produk: {productNames.join(", ")}. Ulasan ini akan berlaku untuk semua produk dalam transaksi ini.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='rating'
              className='text-right'
            >
              Rating
            </Label>
            <div className='col-span-3'>
              <StarRating
                rating={rating}
                setRating={setRating}
              />
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='comment'
              className='text-right'
            >
              Ulasan
            </Label>
            <Textarea
              id='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Bagaimana pengalaman Anda dengan produk ini?'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='image'
              className='text-right'
            >
              Foto
            </Label>
            <Input
              id='image'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='col-span-3'
            />
          </div>
          {error && <p className='text-red-500 text-sm col-span-4 text-center'>{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              variant='secondary'
            >
              Batal
            </Button>
          </DialogClose>
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Mengirim..." : "Kirim Ulasan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
