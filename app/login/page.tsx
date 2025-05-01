import AuthForm from "@/components/layout/auth/AuthForm";
import LeftCircleBackgroundLayout from "@/components/layout/LeftCircleBackground";
import { Metadata } from "next";
import PintuSewa from "@/public/pintuSewa.svg";

export const metadata: Metadata = {
  title: "Masuk | Pintu Sewa",
  description: "Masuk ke akun Anda untuk menyewa barang dengan mudah di Pintu Sewa.",
  keywords: 'rental barang, sewa barang, produk populer, sewa dekat lokasi, pintu sewa',
  openGraph: {
    title: 'Pintu Sewa: Rental Barang Terbaik & Terlengkap Se-Indonesia',
    description: 'Temukan berbagai produk sewa terbaik untuk kebutuhan Anda',
    images: PintuSewa,
  },
};


const LoginPage = () => {
  return (
    <LeftCircleBackgroundLayout>
      <AuthForm type="login" className="relative z-10" />
    </LeftCircleBackgroundLayout>
  );
};

export default LoginPage;
