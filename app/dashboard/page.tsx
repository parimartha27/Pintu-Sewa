import DashboardBody from "@/components/layout/dashboard/Body";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";
import PintuSewa from "@/public/pintuSewa.svg";

export const metadata: Metadata = {
  title: 'Rental Barang Terbaik - Hanya Di Pintu Sewa',
  description: 'Pintu Sewa Sebagai Platform Sewa Menyewa Barang Terlengkap dan Terkini 2025. Jelajahi pilihan produk sewa terbaik untuk kebutuhan Anda. Temukan produk yang paling banyak disewa dan rekomendasi sesuai lokasi Anda.',
  keywords: 'rental barang, sewa barang, produk populer, sewa dekat lokasi, pintu sewa',
  openGraph: {
    title: 'Pintu Sewa: Rental Barang Terbaik & Terlengkap Se-Indonesia',
    description: 'Temukan berbagai produk sewa terbaik untuk kebutuhan Anda',
    images: PintuSewa,
  },
};

const Dashboard = () => {

  return (
    <>
      <Navbar />
        <DashboardBody/>
      <Footer />
    </>
  );
};

export default Dashboard;
