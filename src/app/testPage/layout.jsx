import { Inter } from "next/font/google";
import LoadingPage from "@/components/common/LoadingPage";
import LoadingLinear from "@/components/common/LoadingLinear";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import dynamic from "next/dynamic";
import TransitionPage from "@/components/common/TransitionPage";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserNavbar />
        <Suspense fallback={<LoadingLinear />}>
          <TransitionPage children={children} />
        </Suspense>
        <UserFooter />
      </body>
    </html>
  );
}
