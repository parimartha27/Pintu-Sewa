import DashboardBody from "@/components/layout/dashboard/Body";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Dashboard = () => {

  return (
    <>
    <h1 className="hidden">Siap Sewa, Platform Sewa Menyewa Barang Terlengkap dan Terkini 2025</h1>
      <Navbar />
        <DashboardBody/>
      <Footer />
    </>
  );
};

export default Dashboard;
