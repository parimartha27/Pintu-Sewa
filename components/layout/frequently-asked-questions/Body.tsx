"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const FrequentlyAskedQuestionsBody = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center py-8 px-4 min-h-screen">
      <Card className="w-full max-w-4xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center mx-auto text-xl md:text-2xl xl:text-3xl font-semibold">
            Pertanyaan yang Sering Diajukan (FAQ)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="font-semibold mb-1">1. Apa itu Pintu Sewa?</h2>
            <p>
              Pintu Sewa adalah platform marketplace yang menghubungkan penyewa dan pemilik barang untuk keperluan sewa menyewa berbagai jenis barang dengan mudah dan aman.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1">2. Bagaimana cara menyewa barang?</h2>
            <p>
              Anda hanya perlu membuat akun, memilih barang yang ingin disewa, menentukan tanggal sewa, lalu melakukan pembayaran sesuai instruksi yang tersedia di aplikasi.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1">3. Apakah saya bisa menyewakan barang milik saya?</h2>
            <p>
              Tentu! Anda bisa mendaftarkan barang melalui akun pemilik, mengisi detail barang, menentukan harga sewa, dan mulai menerima pemesanan dari pengguna lain.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1">4. Apa yang terjadi jika barang rusak atau hilang?</h2>
            <p>
              Kerusakan atau kehilangan menjadi tanggung jawab penyewa selama periode sewa. Pemilik dan penyewa dianjurkan untuk menyepakati dokumentasi kondisi barang sebelum dan sesudah sewa.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1">5. Bagaimana proses pembayaran dilakukan?</h2>
            <p>
              Semua transaksi dilakukan melalui sistem pembayaran resmi Pintu Sewa. Kami menyediakan beberapa metode pembayaran yang aman dan terpercaya.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1">6. Apakah saya bisa membatalkan penyewaan?</h2>
            <p>
              Pembatalan dapat dilakukan sebelum barang dikirim atau diambil, sesuai kebijakan pembatalan masing-masing pemilik. Dana akan dikembalikan sesuai ketentuan yang berlaku.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.back()}
            className="bg-color-primaryDark hover:bg-color-secondary text-base"
          >
            Kembali
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FrequentlyAskedQuestionsBody;
