"use client"

import { useState, useEffect, useTransition, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { MoreHorizontal, PlusCircle, Star } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { productBaseUrl } from "@/types/globalVar"

interface Product {
  id: string
  name: string
  category: string
  daily_price: number
  weekly_price: number
  monthly_price: number
  stock: number
  status: string
  main_image: string
  rating: number
  rnb: boolean
}

interface OutputSchema {
  current_page: number
  total_items: number
  total_pages: number
  products: Product[]
}

interface ApiResponse {
  error_schema: { error_code: string; error_message: string }
  output_schema: OutputSchema
}

interface ProductFilterParams {
  search?: string
  page?: number
}

function formatCurrency(amount: number): string {
  if (amount === 0) return "-"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

const apiClient = axios.create({
  baseURL: productBaseUrl,
  headers: { "Content-Type": "application/json" },
})

const shopId = typeof window != "undefined" ? localStorage.getItem("shopId") : null

const getProductsByShop = async (params: ProductFilterParams): Promise<ApiResponse> => {
  const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ""))
  const { data } = await apiClient.get(`/shop/penyedia-jasa/${shopId}`, { params: filteredParams })
  return data
}

const deleteProduct = async (productId: string): Promise<any> => {
  const { data } = await apiClient.delete(`/delete/${productId}`)
  return data
}

// --- MAIN COMPONENT ---
export default function ProductDashboardPage() {
  const router = useRouter()

  const [data, setData] = useState<ApiResponse | null>(null)
  const [filters, setFilters] = useState<ProductFilterParams>({ search: "", page: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, startDeleteTransition] = useTransition()
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  // Debounce untuk search
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 0 }))
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getProductsByShop(filters)
      setData(result)
    } catch (error) {
      console.error("Fetch error:", error)
      toast("Terjadi kesalahan saat mengambil data produk dari server.")
    } finally {
      setIsLoading(false)
    }
  }, [shopId, filters, toast])

  useEffect(() => {
    if (shopId) {
      fetchProducts()
    }
  }, [fetchProducts, shopId])

  const handleDelete = async () => {
    if (!productToDelete) return

    startDeleteTransition(async () => {
      try {
        await deleteProduct(productToDelete.id)
        toast(`Berhasil  Dihapus ✅ \n
          Produk "${productToDelete.name}" telah dihapus.`)
        setProductToDelete(null)
        fetchProducts()
      } catch (error: any) {
        toast("Produk ini tidak dapat dihapus karena masih ada transaksi berlangsung.")
        setProductToDelete(null)
      }
    })
  }

  const products = data?.output_schema?.products || []

  return (
    <>
      <div className='space-y-6 bg-white text-primary-dark p-4 md:p-8 rounded-lg shadow-md'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-primary-dark'>Daftar Produk</h1>
            <p className='text-gray-500'>Kelola semua produk Anda di sini.</p>
          </div>
          <Button
            onClick={() => router.push("/dashboard-seller/product/add")}
            className='bg-custom-gradient-tr hover:bg-blue-900 text-white'
          >
            <PlusCircle className='mr-2 h-4 w-4 bg' />
            Tambah Produk
          </Button>
        </div>

        <div className='flex items-center'>
          <Input
            placeholder='Cari nama produk...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm border-gray-300 focus:ring-primary-blue focus:border-primary-blue'
          />
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-50 hover:bg-gray-100'>
                <TableHead className='text-primary-dark font-semibold'>Produk</TableHead>
                <TableHead className='text-primary-dark font-semibold'>Harga Harian</TableHead>
                <TableHead className='text-primary-dark font-semibold'>Harga Mingguan</TableHead>
                <TableHead className='text-primary-dark font-semibold'>Harga Bulanan</TableHead>
                <TableHead className='text-primary-dark font-semibold'>Stok</TableHead>
                <TableHead className='text-primary-dark font-semibold'>Status</TableHead>
                <TableHead className='text-primary-dark font-semibold'>Rating</TableHead>
                <TableHead className='text-right text-primary-dark font-semibold'>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className='h-48 text-center text-gray-500'
                  >
                    Memuat data produk...
                  </TableCell>
                </TableRow>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className='hover:bg-gray-50'
                  >
                    <TableCell>
                      <div className='flex items-center space-x-3'>
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className='h-12 w-12 rounded-lg object-cover'
                        />
                        <div>
                          <div className='font-medium text-primary-dark'>{product.name}</div>
                          <div className='text-sm text-gray-500'>{product.category}</div>
                          {product.rnb && <Badge className='mt-1 bg-color-secondary'>RnB</Badge>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(product.daily_price)}</TableCell>
                    <TableCell>{formatCurrency(product.weekly_price)}</TableCell>
                    <TableCell>{formatCurrency(product.monthly_price)}</TableCell>
                    <TableCell className='font-medium'>{product.stock}</TableCell>
                    <TableCell>
                      <Switch
                        checked={product.status === "AVAILABLE"}
                        className='data-[state=checked]:bg-color-secondary'
                      />
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-1'>
                        <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 p-0'
                          >
                            <span className='sr-only'>Buka menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => router.push(`/dashboard-seller/product/edit/${product.id}`)}
                            className='cursor-pointer'
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-600 focus:text-white focus:bg-red-600 cursor-pointer'
                            onSelect={() => setProductToDelete(product)}
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className='h-48 text-center text-gray-500'
                  >
                    Tidak ada produk yang cocok dengan pencarian Anda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog
        open={!!productToDelete}
        onOpenChange={() => setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus produk
              <span className='font-bold text-primary-dark'> {productToDelete?.name}</span>? Aksi ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Produk"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
