"use client";
export default function LoadingPage() {
  return (
    <>
      <div className="mx-10 my-20 bg-[#f1f2f6] p-10 xl:mx-[351px]">
        <div className="flex flex-col items-center gap-5 bg-[#f1f2f6] md:h-64 md:flex-row ">
          <div className="box-preview h-64 w-64 animate-pulse rounded-xl bg-[#e4e6ed]"></div>
          <div className="w-64 md:h-64 md:w-3/5">
            <div className="content-preview mb-4 h-5 animate-pulse rounded-xl bg-[#e4e6ed]"></div>
            <div className="content-preview mb-4 h-5 animate-pulse rounded-xl bg-[#e4e6ed]"></div>
            <div className="content-preview mb-4 h-5 w-4/6 animate-pulse rounded-xl bg-[#e4e6ed]"></div>
            <div className="content-preview h-5 w-1/2 animate-pulse rounded-xl bg-[#e4e6ed]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
