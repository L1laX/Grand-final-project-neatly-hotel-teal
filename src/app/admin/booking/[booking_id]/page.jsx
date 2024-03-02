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
  const [relatedPromotion, setRelatedPromotion] = useState(null);

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

        setBooking(data.data);
        setRelatedPromotion(data.data.rooms[0].promotion);

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
      }
    };

    fetchData();
  }, [booking_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!booking) {
    return <div>Booking not found.</div>;
  }

  const {
    customerName,
    roomAmenity,
    guestCount,
    checkInDate,
    checkOutDate,
    paymentType,
    totalPrice,
    additionalRequest,
    bookingRequest,
    created_at,
    user: { email: customerEmail },
    customerBooking_room,
    promotion,
  } = booking;

  console.log("booking request", booking.bookingRequest);

  const {
    promotionCode,
    discount,
    name: promotionName,
  } = relatedPromotion || {};

  console.log(
    "promotion detail",
    promotion,
    promotionCode,
    discount,
    promotionName,
  );

  const stayDuration = Math.floor(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
  );

  const calculateTotalPrice = (
    customerBooking_room,
    checkInDate,
    checkOutDate,
  ) => {
    const stayDuration = calculateStayDuration(checkInDate, checkOutDate);
    return customerBooking_room.reduce(
      (acc, cur) => acc + cur.room.pricePerNight * stayDuration,
      0,
    );
  };

  const roomCount = customerBooking_room.length;

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
            navName={
              customerBooking_room.length > 0
                ? customerBooking_room[0]?.room?.name
                : ""
            }
            buttonName={"Update"}
            notSearch={true}
            backarrow={true}
            linkTo={`/admin/`}
          />
          <div
            aria-label="Booking Details"
            className="flex flex-col justify-center bg-slate-50 px-16 py-11 leading-[150%] text-slate-400 max-md:px-5"
          >
            <div className="flex flex-col rounded border border-solid border-[color:var(--gray-300,#E4E6ED)] bg-white px-20 py-11 max-md:max-w-full max-md:px-5">
              <header className="text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                Customer name
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {customerName}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                Guest(s)
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {guestCount}
              </div>

              {customerBooking_room.map((bookingRoom, index) => (
                <React.Fragment key={index}>
                  <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                    Room type
                  </header>
                  <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                    {bookingRoom.room.name}
                  </div>

                  <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                    Amount
                  </header>
                  <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                    {roomCount} room(s)
                  </div>

                  <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                    Bed type
                  </header>
                  <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                    {bookingRoom.room.bedType}
                  </div>
                </React.Fragment>
              ))}

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                Check-in
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {formattedCheckInDate}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                Check-out
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {formattedCheckOutDate}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                Stay (total)
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {stayDuration} night
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                Booking date
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

                {customerBooking_room.map((bookingRoom, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap"
                  >
                    <span>{bookingRoom.room.name}</span>

                    <span className="grow text-right font-semibold max-md:max-w-full">
                      {bookingRoom.room.pricePerNight.toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2 },
                      )}
                    </span>
                  </div>
                ))}

                {booking.bookingRequest &&
                  booking.bookingRequest
                    .filter((request) => request.price !== 0)
                    .map((request, index) => (
                      <div
                        key={index}
                        className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap"
                      >
                        <span>{request.name}</span>
                        <span className="grow text-right font-semibold max-md:max-w-full">
                          {request.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))}

                <div className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap">
                  <span>{"Promotion Code"}</span>

                  <span className="grow text-right font-semibold max-md:max-w-full">
                    {relatedPromotion?.promotionCode || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap">
                  <span>{"Discount"}</span>

                  <span className="grow text-right font-semibold max-md:max-w-full">
                    {-relatedPromotion?.discount || "N/A"}
                  </span>
                </div>

                <div className="mt-2 flex justify-between gap-5 border-t border-solid border-t-[color:var(--gray-300,#E4E6ED)] pt-6 max-md:max-w-full max-md:flex-wrap">
                  <div className="mt-1.5 flex-auto self-start text-base tracking-tight">
                    Total
                  </div>
                  <span className="flex-auto text-right text-xl font-semibold stacked-fractions tracking-tight">
                    {(
                      totalPrice - (relatedPromotion?.discount || 0)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </form>

              <div className="mb-2.5 mt-10 flex flex-col rounded bg-gray-200 px-6 py-4 text-base tracking-tight text-slate-500 max-md:max-w-full max-md:px-5">
                <div className="font-semibold max-md:max-w-full">
                  Additional Request
                </div>
                <div className="mt-2 max-md:max-w-full">
                  {booking.additionalRequest || "N/A"}
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
