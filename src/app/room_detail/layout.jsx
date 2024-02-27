import { Inter } from "next/font/google";
import LoadingLinear from "@/components/common/LoadingLinear";
import TransitionPage from "@/components/common/TransitionPage";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
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
