import React from "react";
import { cn } from "@/lib/utils";

const Sunmit = () => {
  return (
    <div className="mt-20 flex w-3/6 flex-col items-center rounded-sm border-4 border-double border-indigo-600  bg-[#2F3E35]">
      <h3 className="text-center text-white">
        Your Request has been Submitted
      </h3>
      <p className="text-center text-white">
        The cancellation is complete.
        <span className="block">
          You will recieve an email with a detail and refund within 48 hours.
        </span>
      </p>
      <div className=" flex w-full flex-col items-center border-4 border-double border-indigo-600  bg-[#465C50]">
        <div className="m-5 flex w-5/6 flex-col rounded-sm bg-[#5D7B6A] p-10 text-white">
          <h4 className=" text-white sm:text-sm ">Superior Garden View</h4>
          <p className=" mt-1">Th, 19 Oct 2022 - Fri, 20 Oct 2022</p>
          <p>2 Guests</p>
          <p className=" mt-5 text-[#D5DFDA]">Booking date: Tue, 16 Oct 2022</p>
          <p className=" text-[#D5DFDA]">Cancellation date: Tue, 16 Oct 2022</p>
        </div>
        <hr class="border-1 mb-4 mt-1 w-5/6 bg-[#5D7B6A]" />
        <div className="mb-5 flex w-5/6 items-center justify-between ">
          <p className=" text-[#D5DFDA]">Total Refund</p>
          <h5 className=" text-[#FFFFFF]">THB 2,300.00</h5>
        </div>
      </div>
    </div>
  );
};

export default Sunmit;
