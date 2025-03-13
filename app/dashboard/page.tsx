import DashboardBody from "@/components/layout/dashboard/Body";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Products = [
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
    {
      name: "sepatu",
    },
  ];

const Dashboard = () => {
  return (
    <>
    <h1 className="hidden">SIAP SEWA, SEWA BARANG LENGKAP 2025 DI SIAP SEWA AJA</h1>
      <Navbar />
        <DashboardBody products={Products}/>
      <Footer />
    </>
  );
};

export default Dashboard;
