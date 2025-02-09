import "./globals.css";
import AuthProvider from "@/components/SessionProvider"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider> 
      </body>
    </html>
  );
}
