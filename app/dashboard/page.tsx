"use client"
import DashboardBody from "@/components/layout/dashboard/Body";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import useAuth from "@/hooks/auth/useAuth";

const Dashboard = () => {

  const {token, userId} = useAuth();
  console.log("token di dashboard:", token);
  console.log("userId di dashboard:", userId);

  return (
    <>
      <Navbar token={token} />
        <DashboardBody/>
      <Footer />
    </>
  );
};

export default Dashboard;
