"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/navbar/SidebarAdmin.jsx";
import NavBar from "@/components/navbar/NavbarAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingDetail({ params: { booking_id } }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.info("Fetching Booking Details...", {
          position: "top-center",
          autoClose: false,
        });

        const response = await axios.get(
          `/api/admin/customer_booking/${booking_id}`,
        );
        const data = response.data;

        setBooking(data.data[0]);
        setLoading(false);
        toast.success("Booking Details Fetched Successfully!", {
          position: "top-center",
        });
      } catch (error) {
        console.error("Error fetching data from API:", error.message);
        setError("Failed to fetch data. Please try again.");
        toast.error("Failed to fetch Booking Details. Please try again.", {
          position: "top-center",
        });
      } finally {
        toast.dismiss();
      }
    };

    fetchData();
  }, [booking_id]);

  if (loading) {
    toast.info("Loading...", {
      position: "top-center",
      autoClose: false,
    });
  }

  if (error) {
    toast.error(`Error: ${error}`, {
      position: "top-center",
      autoClose: false,
    });

    return null;
  }
  if (!booking) {
    toast.error("Failed to fetch booking details. Please try again.", {
      position: "top-center",
    });
    return null;
  }
  const { room } = booking.customerBooking_room[0];

  const { name, size, bedType, pricePerNight, roomAmenity, roomGallery } = room;

  const {
    customerName,
    discount,
    guestCount,
    checkInDate,
    checkOutDate,
    paymentType,
    totalPrice,
    additionalRequest,
    created_at,

    user: { email: customerEmail },
  } = booking;

  const stayDuration = Math.floor(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
  );

  const checkInDateObj = new Date(checkInDate);
  const checkOutDateObj = new Date(checkOutDate);
  const bookingDateObj = new Date(created_at);

  const optionsFullDate = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedCheckInDate = checkInDateObj.toLocaleDateString(
    "en-US",
    optionsFullDate,
  );
  const formattedCheckOutDate = checkOutDateObj.toLocaleDateString(
    "en-US",
    optionsFullDate,
  );

  const formattedBookingDate = bookingDateObj.toLocaleDateString(
    "en-US",
    optionsFullDate,
  );

  return (
    <>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col pl-4">
          <NavBar
            customerName={customerName}
            navName={room.name}
            buttonName={"Update"}
            notSearch={true}
            backarrow={true}
            linkTo={`/admin/booking`}
          />
          <div
            aria-label="Booking Details"
            className="flex flex-col justify-center bg-slate-50 px-16 py-11 leading-[150%] text-slate-400 max-md:px-5"
          >
            <div className="flex flex-col rounded border border-solid border-[color:var(--gray-300,#E4E6ED)] bg-white px-20 py-11 max-md:max-w-full max-md:px-5">
              <header className="text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Customer name{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {customerName}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Guest(s){" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {guestCount}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Room type{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {room.name}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Amount{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {room.pricePerNight * stayDuration}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Bed type{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {room.bedType}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Check-in{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {formattedCheckInDate}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Check-out{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {formattedCheckOutDate}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Stay (total){" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {stayDuration} days
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Booking date{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {formattedBookingDate}
              </div>

              <form
                aria-label="Payment details"
                className="mt-10 flex flex-col rounded bg-slate-50 px-6 py-4 text-slate-800 max-md:max-w-full max-md:px-5"
              >
                <div className="flex justify-between gap-4 px-20 pb-4 text-base tracking-tight text-slate-400 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <span>Payment success via</span>
                  <span className="font-semibold">{paymentType}</span>
                </div>

                <div className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap">
                  <span>{room.name}</span>
                  <span className="grow text-right font-semibold max-md:max-w-full">
                    {room.pricePerNight}
                  </span>
                </div>

                <div className="mt-2 flex justify-between gap-5 border-t border-solid border-t-[color:var(--gray-300,#E4E6ED)] pt-6 max-md:max-w-full max-md:flex-wrap">
                  <div className="mt-1.5 flex-auto self-start text-base tracking-tight">
                    {" "}
                    Total{" "}
                  </div>
                  <span className="flex-auto text-right text-xl font-semibold stacked-fractions tracking-tight">
                    {(
                      room.pricePerNight * stayDuration -
                      (discount ?? 0)
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "THB",
                    })}
                  </span>
                </div>
              </form>

              <div className="mb-2.5 mt-10 flex flex-col rounded bg-gray-200 px-6 py-4 text-base tracking-tight text-slate-500 max-md:max-w-full max-md:px-5">
                <div className="font-semibold max-md:max-w-full">
                  {" "}
                  Additional Request{" "}
                </div>
                <div className="mt-2 max-md:max-w-full">
                  {additionalRequest || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default BookingDetail;
