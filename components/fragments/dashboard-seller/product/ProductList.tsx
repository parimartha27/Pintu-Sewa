"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Trash2, Edit, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { productBaseUrl } from "@/types/globalVar"
import { useRouter } from "next/navigation"

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
  rented_times: number
  rnb: boolean
  weight: number
  height: number
  width: number
  length: number
  description: string
  condition_description: string
  min_rented: number
}

interface ApiResponse {
  error_schema: {
    error_code: string
    error_message: string
  }
  output_schema: {
    total_items: number
    total_pages: number
    current_page: number
    products: Product[]
  }
}

const DaftarProduk = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("semua")
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState<string | null>(null)
  const [isRnb, setIsRnb] = useState<boolean | null>(null)
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [shopId, setShopId] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedShopId = localStorage.getItem("shopId")
      if (storedShopId) {
        setShopId(storedShopId)
      }
    }
  }, [])

  const fetchProducts = async () => {
    if (!shopId) return

    try {
      setIsLoading(true)

      // Membuat parameter query
      const params = new URLSearchParams()
      if (category) params.append("category", category)
      if (isRnb !== null) params.append("isRnb", isRnb.toString())
      if (searchQuery) params.append("search", searchQuery)
      params.append("sortBy", sortBy)
      params.append("sortDirection", sortDirection)
      params.append("page", currentPage.toString())

      // Ambil data dari API
      const response = await axios.get<ApiResponse>(`${productBaseUrl}/shop/penyedia-jasa/${shopId}?${params.toString()}`)

      if (response.data.error_schema.error_code === "PS-00-000") {
        setProducts(response.data.output_schema.products)
        setTotalItems(response.data.output_schema.total_items)
        setTotalPages(response.data.output_schema.total_pages)
      } else {
        console.error("API Error:", response.data.error_schema.error_message)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setIsLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${productBaseUrl}/delete/${productId}`)
      setProducts(products.filter((product) => product.id !== productId))
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const toggleRnBStatus = async (productId: string, isRnb: boolean) => {
    try {
      const product = products.find((p) => p.id === productId)
      if (!product) return

      const updatedProduct = { ...product, rnb: isRnb }
      await axios.put(`${productBaseUrl}/edit/${productId}`, {
        shopId: shopId,
        name: product.name,
        category: product.category,
        rentCategory: 1, // Default value as per your requirements
        isRnb: isRnb,
        weight: product.weight,
        height: product.height,
        width: product.width,
        length: product.length,
        dailyPrice: product.daily_price,
        weeklyPrice: product.weekly_price,
        monthlyPrice: product.monthly_price,
        description: product.description,
        conditionDescription: product.condition_description,
        stock: product.stock,
        minRented: product.min_rented,
        status: product.status,
        image: product.main_image,
      })

      setProducts(products.map((p) => (p.id === productId ? updatedProduct : p)))
    } catch (error) {
      console.error("Error updating RnB status:", error)
    }
  }

  // Fungsi untuk mengubah status aktif produk
  const toggleProductStatus = async (productId: string, isActive: boolean) => {
    try {
      const product = products.find((p) => p.id === productId)
      if (!product) return

      const updatedProduct = { ...product, status: isActive ? "AVAILABLE" : "UNAVAILABLE" }
      await axios.put(`${productBaseUrl}/edit/${productId}`, {
        shopId: shopId,
        name: product.name,
        category: product.category,
        rentCategory: 1, // Default value as per your requirements
        isRnb: product.rnb,
        weight: product.weight,
        height: product.height,
        width: product.width,
        length: product.length,
        dailyPrice: product.daily_price,
        weeklyPrice: product.weekly_price,
        monthlyPrice: product.monthly_price,
        description: product.description,
        conditionDescription: product.condition_description,
        stock: product.stock,
        minRented: product.min_rented,
        status: isActive ? "AVAILABLE" : "UNAVAILABLE",
        image: product.main_image,
      })

      setProducts(products.map((p) => (p.id === productId ? updatedProduct : p)))
    } catch (error) {
      console.error("Error updating product status:", error)
    }
  }

  // Fungsi untuk mengubah stok produk
  const updateProductStock = async (productId: string, newStock: number) => {
    try {
      const product = products.find((p) => p.id === productId)
      if (!product) return

      const updatedProduct = { ...product, stock: newStock }
      await axios.put(`${productBaseUrl}/edit/${productId}`, {
        shopId: shopId,
        name: product.name,
        category: product.category,
        rentCategory: 1, // Default value as per your requirements
        isRnb: product.rnb,
        weight: product.weight,
        height: product.height,
        width: product.width,
        length: product.length,
        dailyPrice: product.daily_price,
        weeklyPrice: product.weekly_price,
        monthlyPrice: product.monthly_price,
        description: product.description,
        conditionDescription: product.condition_description,
        stock: newStock,
        minRented: product.min_rented,
        status: product.status,
        image: product.main_image,
      })

      setProducts(products.map((p) => (p.id === productId ? updatedProduct : p)))
    } catch (error) {
      console.error("Error updating product stock:", error)
    }
  }

  // Fungsi untuk memilih semua produk
  const selectAllProducts = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  // Fungsi untuk memilih produk individual
  const toggleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Navigate to edit page
  const handleEditProduct = (productId: string) => {
    router.push(`/dashboard-seller/produk/add-product?id=${productId}`)
  }

  // Filter produk berdasarkan tab aktif
  const filteredProducts = products.filter((product) => {
    if (activeTab === "semua") return true
    if (activeTab === "aktif") return product.status === "AVAILABLE"
    return true
  })

  // Mendapatkan total produk yang aktif
  const activeProductsCount = products.filter((product) => product.status === "AVAILABLE").length

  // Format angka dengan pemisah ribuan
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Mengubah filter atau parameter pencarian
  useEffect(() => {
    fetchProducts()
  }, [category, isRnb, searchQuery, sortBy, sortDirection, currentPage, shopId])

  // Effect untuk menampilkan data saat pertama kali load
  useEffect(() => {
    if (shopId) {
      fetchProducts()
    }
  }, [shopId])

  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-color-primary'>Daftar Produk</h1>
        <Button
          className='bg-custom-gradient-tr hover:bg-color-secondary'
          onClick={() => router.push("/dashboard-seller/produk/add-product")}
        >
          <Plus className='mr-2 h-4 w-4' />
          Tambah Produk
        </Button>
      </div>

      <Card className='border border-gray-200 rounded-lg shadow-sm'>
        {/* Tab Navigation */}
        <div className='border-b border-gray-200 px-6 py-4'>
          <div className='flex space-x-6'>
            <button
              className={`pb-4 ${activeTab === "semua" ? "text-color-secondary border-b-2 border-color-secondary font-medium" : "text-gray-500"}`}
              onClick={() => setActiveTab("semua")}
            >
              Semua Produk ({totalItems})
            </button>
            <button
              className={`pb-4 ${activeTab === "aktif" ? "text-color-secondary border-b-2 border-color-secondary font-medium" : "text-gray-500"}`}
              onClick={() => setActiveTab("aktif")}
            >
              Aktif ({activeProductsCount})
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className='p-6 border-b border-gray-200'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-grow'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <Input
                type='text'
                placeholder='Cari produk Anda'
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className='flex flex-wrap gap-2'>
              <div className='relative'>
                <Select
                  value={category || "all"}
                  onValueChange={(value) => setCategory(value === "all" ? null : value)}
                >
                  <SelectTrigger className='w-[180px] border border-gray-300'>
                    <SelectValue placeholder='Kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Semua Kategori</SelectItem>
                    <SelectItem value='Komputer'>Komputer</SelectItem>
                    <SelectItem value='Elektronik'>Electronik</SelectItem>
                    <SelectItem value='Handpone'>Handphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='relative'>
                <Select
                  value={isRnb === null ? "all" : isRnb.toString()}
                  onValueChange={(value) => setIsRnb(value === "all" ? null : value === "true")}
                >
                  <SelectTrigger className='w-[180px] border border-gray-300'>
                    <SelectValue placeholder='Status RnB' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Semua</SelectItem>
                    <SelectItem value='true'>Rent to Buy</SelectItem>
                    <SelectItem value='false'>Rental Biasa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='relative'>
                <Select
                  value={`${sortBy}-${sortDirection}`}
                  onValueChange={(value) => {
                    const [newSortBy, newSortDirection] = value.split("-")
                    setSortBy(newSortBy)
                    setSortDirection(newSortDirection)
                  }}
                >
                  <SelectTrigger className='w-[180px] border border-gray-300'>
                    <SelectValue placeholder='Urutkan' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='name-asc'>Nama (A-Z)</SelectItem>
                    <SelectItem value='name-desc'>Nama (Z-A)</SelectItem>
                    <SelectItem value='daily_price-asc'>Harga Terendah</SelectItem>
                    <SelectItem value='daily_price-desc'>Harga Tertinggi</SelectItem>
                    <SelectItem value='rating-desc'>Rating Tertinggi</SelectItem>
                    <SelectItem value='rented_times-desc'>Paling Banyak Disewa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center items-center py-10'>
              <div className='loader'>Loading...</div>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-3 text-left'>
                      <div className='flex items-center'>
                        <Checkbox
                          checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                          onCheckedChange={(checked) => selectAllProducts(checked === true)}
                        />
                        <span className='ml-2'>Produk</span>
                      </div>
                    </th>
                    <th className='px-4 py-3 text-left'>Harga Harian</th>
                    <th className='px-4 py-3 text-left'>Harga Mingguan</th>
                    <th className='px-4 py-3 text-left'>Harga Bulanan</th>
                    <th className='px-4 py-3 text-left'>RnB</th>
                    <th className='px-4 py-3 text-left'>Stok</th>
                    <th className='px-4 py-3 text-left'>Status</th>
                    <th className='px-4 py-3 text-left'>Rating</th>
                    <th className='px-4 py-3 text-left'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className='border-b border-gray-200 hover:bg-gray-50'
                      >
                        <td className='px-4 py-4'>
                          <div className='flex items-center'>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProductSelection(product.id)}
                            />
                            <div className='ml-4 flex items-center'>
                              <div className='h-16 w-16 bg-gray-200 rounded-md overflow-hidden'>
                                <img
                                  src={product.main_image}
                                  alt={product.name}
                                  className='h-full w-full object-cover bg-red-900'
                                />
                              </div>
                              <div className='ml-4'>
                                <p className='font-medium text-gray-900'>{product.name}</p>
                                <p className='text-gray-500'>{product.category}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500'>Rp</span>
                            </div>
                            <Input
                              type='text'
                              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md w-32'
                              value={formatPrice(product.daily_price)}
                              readOnly
                            />
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500'>Rp</span>
                            </div>
                            <Input
                              type='text'
                              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md w-32'
                              value={formatPrice(product.weekly_price)}
                              readOnly
                            />
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500'>Rp</span>
                            </div>
                            <Input
                              type='text'
                              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md w-32'
                              value={formatPrice(product.monthly_price)}
                              readOnly
                            />
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <Switch
                            checked={product.rnb}
                            onCheckedChange={(checked) => toggleRnBStatus(product.id, checked)}
                          />
                        </td>
                        <td className='px-4 py-4'>
                          <Input
                            type='number'
                            className='px-4 py-2 border border-gray-300 rounded-md w-24'
                            value={product.stock}
                            onChange={(e) => updateProductStock(product.id, parseInt(e.target.value))}
                            min={1}
                          />
                        </td>
                        <td className='px-4 py-4'>
                          <Switch
                            checked={product.status === "AVAILABLE"}
                            onCheckedChange={(checked) => toggleProductStatus(product.id, checked)}
                          />
                        </td>
                        <td className='px-4 py-4'>
                          <div className='flex items-center'>
                            <Star
                              className='h-4 w-4 text-yellow-400 mr-1'
                              fill={product.rating > 0 ? "currentColor" : "none"}
                            />
                            <span>{product.rating > 0 ? product.rating : "0"}</span>
                            <span className='ml-2 text-gray-500 text-sm'>({product.rented_times})</span>
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <div className='relative'>
                            <Select
                              onValueChange={(value) => {
                                if (value === "edit") {
                                  handleEditProduct(product.id)
                                } else if (value === "delete") {
                                  deleteProduct(product.id)
                                }
                              }}
                            >
                              <SelectTrigger className='w-24 border border-gray-300'>
                                <SelectValue placeholder='Aksi' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='edit'>
                                  <div className='flex items-center'>
                                    <Edit className='h-4 w-4 mr-2' /> Edit
                                  </div>
                                </SelectItem>
                                <SelectItem
                                  value='delete'
                                  className='text-red-600'
                                >
                                  <div className='flex items-center'>
                                    <Trash2 className='h-4 w-4 mr-2' /> Hapus
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className='py-8 text-center'
                      >
                        <div className='flex flex-col items-center justify-center text-gray-500'>
                          <p className='text-lg font-medium'>Anda belum memiliki barang</p>
                          <p className='text-sm'>Yuk tambah barangmu terlebih dahulu</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center mt-6'>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={i === currentPage ? "default" : "outline"}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant='outline'
                  disabled={currentPage === totalPages - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default DaftarProduk
