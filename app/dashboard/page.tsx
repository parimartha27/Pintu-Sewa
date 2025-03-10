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
      <Navbar />
        <DashboardBody products={Products}/>
      <Footer />
    </>
  );
};

export default Dashboard;
