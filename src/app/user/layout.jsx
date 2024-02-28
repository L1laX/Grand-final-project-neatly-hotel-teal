import { Inter } from "next/font/google";

import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import { Suspense } from "react";
import LoadingLinear from "@/components/common/LoadingLinear";
import TransitionPage from "@/components/common/TransitionPage";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserNavbar />
        <Suspense fallback={<LoadingLinear />}>
          <TransitionPage children={children} />
        </Suspense>
      </body>
    </html>
  );
}
