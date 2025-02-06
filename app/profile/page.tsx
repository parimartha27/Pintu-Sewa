import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Toko from "@/public/toko.svg";


const EditProfile = () => {
    return (
        <div>
            <Image src={Toko}/>
            <h1>Edit Profile</h1>
        </div>
    );
};

export default EditProfile;