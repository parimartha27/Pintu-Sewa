"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Filter, ChevronDown, Trash2, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  isActive: boolean
  imageUrl: string
}

const DaftarProduk = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Novel Karangan Parimartha",
      sku: "SKU",
      price: 10000000,
      stock: 100,
      isActive: true,
      imageUrl: "/images/book.jpg",
    },
    {
      id: "2",
      name: "Novel Karangan Parimartha",
      sku: "SKU",
      price: 10000000,
      stock: 100,
      isActive: false,
      imageUrl: "/images/book.jpg",
    },
    {
      id: "3",
      name: "Novel Karangan Parimartha",
      sku: "SKU",
      price: 10000000,
      stock: 100,
      isActive: true,
      imageUrl: "/images/book.jpg",
    },
  ])

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("semua")
  const [isLoading, setIsLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setIsLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      // Uncomment dan sesuaikan kode berikut untuk mengintegrasikan dengan API
      // await axios.delete(`/api/seller/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId))
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  // Fungsi untuk mengubah status aktif produk
  const toggleProductStatus = async (productId: string, isActive: boolean) => {
    try {
      // Uncomment dan sesuaikan kode berikut untuk mengintegrasikan dengan API
      // await axios.patch(`/api/seller/products/${productId}`, { isActive });
      setProducts(products.map((product) => (product.id === productId ? { ...product, isActive } : product)))
    } catch (error) {
      console.error("Error updating product status:", error)
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

  // Filter produk berdasarkan tab aktif dan pencarian
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "semua") return matchesSearch
    if (activeTab === "aktif") return matchesSearch && product.isActive

    return matchesSearch
  })

  // Format angka dengan pemisah ribuan
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  useEffect(() => {
    // fetchProducts();
  }, [])

  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-color-primary'>Daftar Produk</h1>
        <a href='/dashboard-seller/product/add'>
          <Button className='bg-custom-gradient-tr hover:bg-color-secondary'>
            <Plus className='mr-2 h-4 w-4' />
            Tambah Produk
          </Button>
        </a>
      </div>

      <Card className='border border-gray-200 rounded-lg shadow-sm'>
        {/* Tab Navigation */}
        <div className='border-b border-gray-200 px-6 py-4'>
          <div className='flex space-x-6'>
            <button
              className={`pb-4 ${activeTab === "semua" ? "text-color-secondary border-b-2 border-color-secondary font-medium" : "text-gray-500"}`}
              onClick={() => setActiveTab("semua")}
            >
              Semua Produk (2)
            </button>
            <button
              className={`pb-4 ${activeTab === "aktif" ? "text-color-secondary border-b-2 border-color-secondary font-medium" : "text-gray-500"}`}
              onClick={() => setActiveTab("aktif")}
            >
              Aktif (2)
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
                <Button
                  variant='outline'
                  className='flex items-center gap-2 border border-gray-300'
                >
                  <Filter className='h-4 w-4' />
                  Filter
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </div>

              <div className='relative'>
                <Button
                  variant='outline'
                  className='flex items-center gap-2 border border-gray-300'
                >
                  Filter Spesial
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </div>

              <div className='relative'>
                <Button
                  variant='outline'
                  className='flex items-center gap-2 border border-gray-300'
                >
                  Kategori
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </div>

              <div className='relative'>
                <Button
                  variant='outline'
                  className='flex items-center gap-2 border border-gray-300'
                >
                  Urutkan
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <CardContent>
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
                      <span className='ml-2'>Pilih Semua Produk</span>
                    </div>
                  </th>
                  <th className='px-4 py-3 text-left'>Harga</th>
                  <th className='px-4 py-3 text-left'>Kelengkapan</th>
                  <th className='px-4 py-3 text-left'>Stok</th>
                  <th className='px-4 py-3 text-left'>Aktif</th>
                  <th className='px-4 py-3 text-left'>Pengaturan</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
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
                              src={product.imageUrl}
                              alt={product.name}
                              className='h-full w-full object-cover'
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = "/placeholder.png"
                              }}
                            />
                          </div>
                          <div className='ml-4'>
                            <p className='font-medium text-gray-900'>{product.name}</p>
                            <p className='text-gray-500'>{product.sku}</p>
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
                          value={formatPrice(product.price)}
                          onChange={(e) => {
                            // Handle price change logic
                          }}
                        />
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <Button
                        variant='outline'
                        className='flex items-center gap-2 border border-gray-300'
                      >
                        Rent to Buy
                        <ChevronDown className='h-4 w-4' />
                      </Button>
                    </td>
                    <td className='px-4 py-4'>
                      <Input
                        type='number'
                        className='px-4 py-2 border border-gray-300 rounded-md w-24'
                        value={product.stock}
                        onChange={(e) => {
                          // Handle stock change logic
                        }}
                      />
                    </td>
                    <td className='px-4 py-4'>
                      <Switch
                        checked={product.isActive}
                        onCheckedChange={(checked) => toggleProductStatus(product.id, checked)}
                      />
                    </td>
                    <td className='px-4 py-4'>
                      <div className='relative'>
                        <Button
                          variant='outline'
                          className='flex items-center gap-2 border border-gray-300'
                        >
                          Atur
                          <ChevronDown className='h-4 w-4' />
                        </Button>
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden'>
                          <div className='py-1'>
                            <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'>
                              <Trash2 className='h-4 w-4 mr-2' /> Hapus
                            </button>
                            <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'>
                              <Edit className='h-4 w-4 mr-2' /> Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default DaftarProduk
