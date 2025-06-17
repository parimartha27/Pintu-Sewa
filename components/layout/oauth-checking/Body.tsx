"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPopup from "../LoadingPopUp";
import { getSession } from "next-auth/react";
import { sendOauthData } from "@/services/authServices";

interface userdataProps {
  email: string;
  username: string;
  profilePicture: string;
}

const OauthCheckingBody = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const session = await getSession();
      setLoading(true);
      try {
        if (session?.user) {
          const userData: userdataProps = {
            username: session.user.name || "Guest",
            email: session.user.email || "",
            profilePicture: session.user.image || "/default-profile.png",
          };

          //   DISINI MINTA ENDPOINT BALIKAN
          await sendOauthData(userData, (response) => {
            if (response.error_schema?.error_message === "SUCCESS") {
              if (response.output_schema.status === "REGISTERED") {
                document.cookie = `customerId=${response.output_schema.customer_id}; path=/; Secure; SameSite=Lax`;
                localStorage.setItem("username", userData.username);
                localStorage.setItem("email", userData.email);
                // localStorage.setItem("image", userData.profilePicture);
                localStorage.setItem("register_by", "email");
                router.push("/input-biodata");
              } else if (response.output_schema.status === "ACTIVE") {
                document.cookie = `customerId=${response.output_schema.customer_id}; path=/; Secure; SameSite=Lax`;
                document.cookie = `token=${response.output_schema.token}; path=/; Secure; SameSite=Lax`;
                localStorage.setItem(
                  "username",
                  response.output_schema.username || userData.username
                );
                localStorage.setItem(
                  "image",
                  response.output_schema.image || userData.profilePicture
                );
                router.push("/");
              }
            }
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return <LoadingPopup message={"Mohon Tunggu"} />;
  }
};

export default OauthCheckingBody;
