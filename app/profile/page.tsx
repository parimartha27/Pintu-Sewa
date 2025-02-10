import React from "react";
import Navbar from "@/components/layout/Navbar";
import ProfileBody from "@/components/layout/profile/Body";
import Footer from "@/components/layout/Footer";

const ProfilePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ProfileBody >{children}</ProfileBody>
      <Footer />
    </>
  );
};

export default ProfilePage;
