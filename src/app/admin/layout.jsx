import { Inter } from "next/font/google";


import UserNavbar from "@/components/UserNavbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neatly Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
