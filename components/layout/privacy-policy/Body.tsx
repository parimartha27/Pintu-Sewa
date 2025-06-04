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
const PrivacyPolicyBody = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center py-8 px-4 min-h-screen ">
      <Card className="w-full max-w-4xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center mx-auto text-xl md:text-2xl xl:text-3xl font-semibold">
            Kebijakan Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm md:text-base leading-relaxed">
          <p>
            Selamat datang di <strong>Pintu Sewa</strong>. Dengan menggunakan
            layanan kami, Anda setuju untuk mematuhi kebijakan pengguna berikut:
          </p>

          <div>
            <h2 className="font-semibold mb-1">1. Akun Pengguna</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Pengguna wajib memberikan informasi yang benar dan akurat saat
                mendaftar.
              </li>
              <li>
                Setiap pengguna bertanggung jawab atas keamanan akun pribadi,
                termasuk kata sandi.
              </li>
              <li>
                Pintu Sewa berhak menonaktifkan akun yang terbukti melakukan
                pelanggaran atau aktivitas mencurigakan.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">2. Penggunaan Layanan</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Pengguna dilarang menyewakan barang ilegal, berbahaya, atau
                melanggar hukum.
              </li>
              <li>
                Penyewa wajib mengembalikan barang tepat waktu dalam kondisi
                seperti saat diterima.
              </li>
              <li>
                Pintu Sewa tidak bertanggung jawab atas kerusakan atau
                kehilangan barang yang disewa.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">3. Transaksi dan Pembayaran</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Seluruh transaksi dilakukan melalui sistem yang disediakan oleh
                Pintu Sewa.
              </li>
              <li>
                Pembayaran harus dilakukan sesuai prosedur yang berlaku di
                aplikasi.
              </li>
              <li>
                Biaya layanan dapat dikenakan kepada penyewa atau pemilik sesuai
                ketentuan yang ditetapkan.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">4. Perlindungan Data</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Data pribadi pengguna akan dijaga kerahasiaannya sesuai
                kebijakan privasi kami.
              </li>
              <li>
                Pintu Sewa tidak akan membagikan data pengguna kepada pihak
                ketiga tanpa izin.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1">5. Perubahan Kebijakan</h2>
            <p>
              Pintu Sewa berhak <strong>mengubah kebijakan</strong> ini
              sewaktu-waktu. Perubahan akan diinformasikan melalui{" "}
              <strong>aplikasi atau email</strong>. Dengan terus menggunakan
              layanan kami, Anda dianggap telah membaca, memahami, dan
              menyetujui kebijakan ini.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.back()} className="bg-color-primaryDark hover:bg-color-secondary text-base">
            Kembali
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PrivacyPolicyBody;
