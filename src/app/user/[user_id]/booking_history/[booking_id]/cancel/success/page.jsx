"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import LoadingRoom from "@/components/common/LoadingRoom";

function SuccessCancel({ params }) {
  const { user_id, booking_id } = params;
  const router = useRouter();
  const [cancelBooking, setCancelBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(booking_id, "booking_id");

  const getBookingHistory = async () => {
    try {
      const res = await axios.get(`/api/user/booking_history/${booking_id}`);
      if (res.status === 200) {
        setIsLoading(true);
      }
      setCancelBooking(res.data.data);
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
      {isLoading ? (
        <div className="result-order mx-10 my-20 flex flex-col items-center rounded-sm bg-[#2F3E35] xl:mx-[351px]">
          <div className="result-header p-10">
            <h3 className=" text-center text-white">
              The Cancellation is Complete
            </h3>
            <p className=" mt-3 text-center text-sm text-[#abc0b4]">
              The cancellation is complete.
              <br />
              You will recieve an email with a detail and refund within 48
              hours.
            </p>
          </div>
          <div className="reserved-result-room flex w-full flex-col items-center divide-y-[1px] divide-[#5d7b6a] bg-[#465C50]">
            <div className="date-booking-form mx-10 my-6 flex w-5/6 flex-col rounded-sm">
              <div className="booking-date flex flex-col justify-between rounded bg-[#5D7B6A] p-6">
                <h5 className=" text-white">
                  {cancelBooking?.customerBooking_room[0]?.room?.name}
                </h5>
                <h5 className=" mt-4 text-base font-medium text-white">
                  {cancelBooking?.checkInDate
                    ? format(
                        new Date(cancelBooking?.checkInDate).toString(),
                        "eee, dd MMM yyyy",
                      )
                    : null}{" "}
                  -{" "}
                  {cancelBooking?.checkOutDate
                    ? format(
                        new Date(cancelBooking?.checkOutDate).toString(),
                        "eee, dd MMM yyyy",
                      )
                    : null}
                  <p className=" body1 text-white">
                    {cancelBooking?.guestCount} Guests
                  </p>
                </h5>

                <p className=" body1 mt-10 text-[#D5DFDA]">
                  Booking date:{" "}
                  {cancelBooking?.created_at
                    ? format(
                        new Date(cancelBooking?.created_at).toString(),
                        "eee, dd MMM yyyy",
                      )
                    : null}
                </p>
                <p className=" body1 text-[#D5DFDA]">
                  Cancellation date:{" "}
                  {cancelBooking?.last_updated_at
                    ? format(
                        new Date(cancelBooking?.last_updated_at).toString(),
                        "eee, dd MMM yyyy",
                      )
                    : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingRoom />
      )}

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

export default SuccessCancel;
