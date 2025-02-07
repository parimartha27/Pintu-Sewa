import DashboardBody from "@/components/layout/dashboard/Body";
import Category from "@/components/layout/dashboard/Category";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductList from "@/components/layout/ProductList";

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
