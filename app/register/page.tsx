import AuthForm from "@/components/layout/auth/AuthForm";
import RightCircleBackgroundLayout from "@/components/layout/RightCircleBackground";
import { Metadata } from "next";
import PintuSewa from "@/public/pintuSewa.svg";

export const metadata: Metadata = {
  title: "Daftar | Pintu Sewa",
  description: "Buat akun baru di Pintu Sewa dan mulai sewa barang dengan nyaman dan terpercaya.",
  keywords: 'rental barang, sewa barang, produk populer, sewa dekat lokasi, pintu sewa',
  openGraph: {
    title: 'Pintu Sewa: Rental Barang Terbaik & Terlengkap Se-Indonesia',
    description: 'Temukan berbagai produk sewa terbaik untuk kebutuhan Anda',
    images: PintuSewa,
  },
};

const RegisterPage = () => {
  return (
    <RightCircleBackgroundLayout>
      <AuthForm type="register" className="relative z-10" />
    </RightCircleBackgroundLayout>
  );
};

export default RegisterPage;
