import React from "react";
import Sidebar from "../../Sidebar/page.jsx";
import Link from "next/link";

function BookingDetail() {
  const customerName = "Kate Cho";
  const numberOfGuests = 2;
  const roomType = "Superior Garden View Room";
  const amount = "1 room";
  const bedType = "Single bed";
  const checkInDate = "Th, 19 Oct 2022";
  const checkOutDate = "Fri, 20 Oct 2022";
  const stayDuration = "1 night";
  const bookingDate = "Tue, 16 Oct 2022";
  const paymentMethod = "Credit Card - *888";
  const roomPrice = "2,500.00";
  const airportTransferPrice = "200.00";
  const promotionCodeDiscount = "-400.00";
  const totalAmount = "THB 2,300.00";
  const additionalRequest = "Can I have some chocolate?";

  return (
    <>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col">
          <header className="flex gap-4 border-b border-solid border-b-[color:var(--gray-300,#E4E6ED)] bg-white px-16 py-6 text-xl leading-8 tracking-tight text-slate-800 max-md:flex-wrap max-md:px-5">
            <Link href="/admin/booking">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb61ef0fe7c8a6768029413a6db1e5e923c08b629cf04d79c844069a55152c1d?apiKey=0be454901f214db788ae581e588490bf&"
                className="my-auto aspect-square w-6"
                alt="Profile Image"
              />
            </Link>
            <div className="font-semibold stacked-fractions">Kate Cho</div>
            <div className="grow stacked-fractions max-md:max-w-full">
              Premier Sea View
            </div>
          </header>

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
                {numberOfGuests}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Room type{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {roomType}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Amount{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {amount}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Bed type{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {bedType}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Check-in{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {checkInDate}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Check-out{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {checkOutDate}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Stay (total){" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {stayDuration}
              </div>

              <header className="mt-10 text-xl font-semibold stacked-fractions tracking-tight max-md:max-w-full">
                {" "}
                Booking date{" "}
              </header>
              <div className="mt-1 text-base tracking-tight text-black max-md:max-w-full">
                {bookingDate}
              </div>

              <form
                aria-label="Payment details"
                className="mt-10 flex flex-col rounded bg-slate-50 px-6 py-4 text-slate-800 max-md:max-w-full max-md:px-5"
              >
                <div className="flex justify-between gap-4 px-20 pb-4 text-base tracking-tight text-slate-400 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <span>Payment success via</span>
                  <span className="font-semibold">{paymentMethod}</span>
                </div>

                <div className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap">
                  <span>Superior Garden View Room</span>
                  <span className="grow text-right font-semibold max-md:max-w-full">
                    {roomPrice}
                  </span>
                </div>

                <div className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap">
                  <span>Airport tranfer</span>
                  <span className="grow text-right font-semibold max-md:max-w-full">
                    {airportTransferPrice}
                  </span>
                </div>

                <div className="flex justify-between gap-4 whitespace-nowrap py-3 text-base tracking-tight max-md:max-w-full max-md:flex-wrap">
                  <span>Promotion Code</span>
                  <span className="grow text-right font-semibold max-md:max-w-full">
                    {promotionCodeDiscount}
                  </span>
                </div>

                <div className="mt-2 flex justify-between gap-5 border-t border-solid border-t-[color:var(--gray-300,#E4E6ED)] pt-6 max-md:max-w-full max-md:flex-wrap">
                  <div className="mt-1.5 flex-auto self-start text-base tracking-tight">
                    {" "}
                    Total{" "}
                  </div>
                  <span className="flex-auto text-right text-xl font-semibold stacked-fractions tracking-tight">
                    {totalAmount}
                  </span>
                </div>
              </form>

              <div className="mb-2.5 mt-10 flex flex-col rounded bg-gray-200 px-6 py-4 text-base tracking-tight text-slate-500 max-md:max-w-full max-md:px-5">
                <div className="font-semibold max-md:max-w-full">
                  {" "}
                  Additional Request{" "}
                </div>
                <div className="mt-2 max-md:max-w-full">
                  {additionalRequest}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetail;
