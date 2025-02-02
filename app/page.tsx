"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/navbar/Navbar";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  // if (!session?.user) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-fuschia-200 flex flex-col justify-center items-center mx-auto">
        <h2 className="text-4xl text-fuchsia-500 font-bold mb-7 text-center">
          Dashboard
        </h2>
        <div className="flex justify-center space-x-10 w-1/2">
          <Link href={"/login"}>
            <button className="bg-color-primary text-white px-4 py-2 rounded-lg hover:bg-fuchsia-500">
              login
            </button>
          </Link>

          <Link href={"/register"}>
            <button className="bg-color-primary text-white px-4 py-2 rounded-lg hover:bg-fuchsia-500">
              register
            </button>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
        {session && (
          <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <Image
              width={200}
              height={200}
              src={session.user?.image || "/default-avatar.png"}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <h1 className="text-2xl font-semibold">{session.user?.name}</h1>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        )}
      </div>
    </>
  );
}
