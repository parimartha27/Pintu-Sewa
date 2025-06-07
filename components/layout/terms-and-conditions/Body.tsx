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

const TermsAndConditionsBody = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center py-8 px-4 min-h-screen">
      <Card className="w-full max-w-4xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center mx-auto text-xl md:text-2xl xl:text-3xl font-semibold">
            Syarat dan Ketentuan Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm md:text-base">
          <p>
            Dengan menggunakan layanan <strong>Pintu Sewa</strong>, Anda dianggap telah membaca, memahami, dan menyetujui Syarat dan Ketentuan berikut:
          </p>

          <div>
            <h2 className="font-semibold mb-1">1. Kelayakan Pengguna</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Pengguna harus berusia minimal 17 tahun atau memiliki izin dari wali.</li>
              <li>Setiap akun hanya dapat digunakan oleh satu individu dan tidak dapat dialihkan.</li>
              <li>Pendaftaran akun harus menggunakan data yang sah dan valid.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">2. Kewajiban Pengguna</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Pengguna wajib menjaga kondisi barang sewaan dan mengembalikannya sesuai waktu yang disepakati.</li>
              <li>Dilarang menggunakan layanan untuk tindakan yang melanggar hukum atau merugikan pihak lain.</li>
              <li>Pengguna bertanggung jawab atas kerusakan atau kehilangan barang selama masa sewa.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">3. Hak dan Tanggung Jawab Pintu Sewa</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Pintu Sewa berhak menolak, membatasi, atau menangguhkan layanan kepada pengguna yang melanggar ketentuan.</li>
              <li>Pintu Sewa tidak bertanggung jawab atas kesalahan atau kelalaian antara penyewa dan pemilik barang.</li>
              <li>Kami berhak melakukan verifikasi terhadap informasi dan aktivitas akun pengguna.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">4. Proses Transaksi</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Semua pembayaran dan penyewaan dilakukan melalui platform resmi Pintu Sewa.</li>
              <li>Transaksi yang telah dilakukan tidak dapat dibatalkan kecuali atas kesepakatan bersama.</li>
              <li>Pintu Sewa berperan sebagai perantara dan tidak memiliki barang yang disewakan secara langsung.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">5. Perubahan Syarat dan Ketentuan</h2>
            <p>
              Pintu Sewa berhak <strong>mengubah Syarat dan Ketentuan</strong> ini
              sewaktu-waktu. Perubahan akan diinformasikan melalui{" "}
              <strong>aplikasi atau email</strong>. Penggunaan layanan secara terus-menerus dianggap sebagai bentuk persetujuan terhadap pembaruan tersebut.
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

export default TermsAndConditionsBody;
