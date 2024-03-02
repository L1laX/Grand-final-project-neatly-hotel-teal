"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import axios from "axios";
import { useEffect, useState } from "react";

function SuccessRefund({ booking_id }) {
  const router = useRouter();
  const [refundBooking, setRefundBooking] = useState([]);

  const getBookingHistory = async () => {
    try {
      const res = await axios.get(`/api/user/booking_history/${booking_id}`);
      if (res.status === 200) {
        setIsLoading(true);
      }
      setRefundBooking(res.data.data);
      console.log(res.data.data, "Fetching Booking History");
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  return (
    <>
      <div className="result-order mx-10 my-20 flex flex-col items-center rounded-sm bg-[#2F3E35] xl:mx-[351px]">
        <div className="result-header p-10">
          <h3 className=" text-center text-white">
            Your Request has been Submitted
          </h3>
          <p className=" mt-3 text-center text-sm text-[#abc0b4]">
            The cancellation is complete.
            <br />
            You will recieve an email with a detail and refund within 48 hours.
          </p>
        </div>
        <div className="reserved-result-room flex w-full flex-col items-center divide-y-[1px] divide-[#5d7b6a] bg-[#465C50]">
          <div className="date-booking-form mx-10 my-6 flex w-5/6 flex-col rounded-sm">
            <div className="booking-date flex flex-col justify-between rounded bg-[#5D7B6A] p-6">
              <h5 className=" text-white">{refundBooking?.room?.name}</h5>
              <h5 className=" mt-4 text-base font-medium text-white">
                {refundBooking?.checkInDate} - {refundBooking?.checkOutDate}
                <p className=" body1 text-white">
                  {refundBooking?.guestCount} Guests
                </p>
              </h5>

              <p className=" body1 mt-10 text-[#D5DFDA]">
                Booking date: {refundBooking?.created_at}
              </p>
              <p className=" body1 text-[#D5DFDA]">
                Cancellation date: {refundBooking?.last_updated_at}
              </p>
            </div>
          </div>

          <div className="flex w-5/6 items-center justify-between py-6 ">
            <p className=" body1 text-[#D5DFDA]">Total Refund</p>
            <h5 className=" text-[#FFFFFF]">THB {refundBooking?.totalPrice}</h5>
          </div>
        </div>
      </div>

      {/* Button */}
      <section className="mx-10 my-10 xl:mx-[351px]">
        <div className=" flex flex-row justify-center gap-10 ">
          <PrimaryBtn
            btnName="Back to Home"
            handleClick={() => {
              router.push(`/`);
            }}
          ></PrimaryBtn>
        </div>
      </section>
    </>
  );
}

export default SuccessRefund;
