import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="h-[24px] bg-color-primaryDark"></div>

      <div className=" flex items-center justify-between h-3/4 bg-white px-6 shadow-md">
        <div className="hidden sm:block text-lg font-semibold">SIAP SEWA</div>

        <div className="flex items-center w-full max-w-lg space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border border-gray-300 rounded-full"
            placeholder="Cari barang atau penyedia"
          />

          <button className="p-2 bg-blue-500 text-white rounded-full">
            🔍
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src="/path-to-cart-icon.svg"
              alt="Cart Icon"
              width={24}
              height={24}
            />
          </div>

          <div className="h-6 border-l border-gray-400"></div>

          {!session ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Image
                  src="/path-to-store-icon.svg"
                  alt="Store Icon"
                  width={24}
                  height={24}
                />
                <span className="font-semibold">Toko</span>
              </div>

              <div className="flex items-center space-x-2">
                <Image
                  src={session.user?.image || "/default-avatar.jpg"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{session.user?.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
