import "./globals.css";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthProvider from "@/components/SessionProvider"; 



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions); 

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>{children}</AuthProvider> 
      </body>
    </html>
  );
}
