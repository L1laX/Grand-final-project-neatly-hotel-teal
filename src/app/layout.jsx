import { Inter } from "next/font/google";
import "./globals.css";
import { CustomProvider } from "@/provider/nextauth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neatly Hotel",
  description: "Neatly Hotel",
  keywords: [
    "Neatly Hotel",
    "Room Booking",
    "Hotel Booking",
    "Hotel Management System",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
