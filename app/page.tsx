import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen w-full bg-fuschia-200 flex flex-col justify-center items-center mx-auto">
        <h2 className="text-4xl text-fuchsia-500 font-bold mb-7 text-center">Dashboard</h2>
        <div className="flex justify-center space-x-10 w-1/2">
          <Link href={"/login"}>
            <button className="bg-color-primary text-white px-4 py-2 rounded-lg hover:bg-fuchsia-500">login</button>
          </Link>

          <Link href={"/register"}>
            <button className="bg-color-primary text-white px-4 py-2 rounded-lg hover:bg-fuchsia-500">register</button>
          </Link>
        </div>
      </div>
    </>
  );
}
