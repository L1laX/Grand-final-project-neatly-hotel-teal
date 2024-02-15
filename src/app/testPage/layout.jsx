import { Inter } from "next/font/google";

import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserNavbar />
        {children}
        <UserFooter />
      </body>
    </html>
  );
}
