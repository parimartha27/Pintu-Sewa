import React from "react";
import EditAddressBody from "@/components/layout/profile/edit-address/Body";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileSidebarLayout from "@/components/layout/ProfileSidebar";

const EditAddressPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout">
        <ProfileSidebarLayout />
        <div className="w-full p-2 md:p-0 max-h-auto">
          <EditAddressBody />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditAddressPage;
