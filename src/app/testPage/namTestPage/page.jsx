import { Suspense } from "react";
import LoadingPage from "@/components/common/LoadingPage";
import dynamic from "next/dynamic";
import SubmitTotal from "@/components/common/SubmitTotal";
import TestContent from "@/components/common/TestContent";
// const LoadingSubmitTotal = dynamic(
//   () => import("@/components/common/SubmitTotal"),
//   {
//     ssr: false,
//     loading: () => <LoadingPage />,
//   },
// );
const NamTestPage = async () => {
  // ต้องมีการใช้ async เพื่อให้มีการรอให้โหลดเสร็จก่อน
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      {/* ใช้ suspense ใน layoutไปแล้ว ไม่ต้องใช้ตรงนี้ 
      ยกเว้นกรณีโหลดทีละelement ต้องทำเงื่อนไขconditional rendering
      <Suspense fallback={<LoadingPage />}>
        <SubmitTotal />
      </Suspense> */}
      <TestContent />
    </div>
  );
};

export default NamTestPage;
