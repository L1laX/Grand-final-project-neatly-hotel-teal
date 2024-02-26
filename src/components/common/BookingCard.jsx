import React from "react";
import Image from "next/legacy/image";
import SuperiorGardenView from "/src/asset/homepage/Superior-Garden-View.jpg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addDays, format } from "date-fns";
import Link from "next/link";

export default function BookingCard({
  bookingId,
  roomname,
  bookingdate,
  customerCheckin,
  customerCheckout,
  guestAmount,
  paymentMethodType,
  addReqText,
  addReqPrice,
  promotionPrice,
  bookingTotalPrice,
  pricePerNight,
  userId,
  roomImage,
}) {
  return (
    <div className="mb-10 flex w-full flex-col ">
      ตารางroom gallery
      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Image */}

        <div className="relative flex h-[16rem] w-11/12 md:h-[18rem] md:w-3/5 xl:w-2/5">
          <Image
            src={SuperiorGardenView}
            layout="fill"
            objectFit="cover"
            alt="Suite"
          />
        </div>
        {/* Booking Card Detail */}
        <div className="flex w-full flex-col">
          <div className="mx-4 mt-4 flex w-full flex-col justify-between md:mt-0 md:flex-row md:px-6">
            <h3 className=" pr-2 text-2xl lg:text-3xl xl:text-4xl">
              {roomname}
            </h3>
            <div>
              <p className="text-[#9AA1B9] md:text-right">
                Booking date: {format(bookingdate, "eee, dd MMM yyyy")}
              </p>
              <p className="text-[#9AA1B9] md:text-right">
                Cancellation date: {format(bookingdate, "eee, dd MMM yyyy")}
              </p>
            </div>
          </div>

          <div className=" lg:text-md flex w-full px-4 py-5 text-sm text-[#424C6B] max-md:justify-between md:px-6 md:py-10 xl:px-14 xl:text-lg">
            <div className="flex flex-col pr-3">
              <p className=" font-semibold">Check-in</p>
              <p>
                {customerCheckin === null
                  ? null
                  : format(customerCheckin, "eee, dd MMM yyyy")}
                | After 2:00 PM
              </p>
            </div>
            <div className="flex flex-col pl-3">
              <p className=" font-semibold">Check-out</p>
              <p>
                {customerCheckout === null
                  ? null
                  : format(customerCheckout, "eee, dd MMM yyyy")}
                | Before 12:00 PM
              </p>
            </div>
          </div>

          {/* Booking Detail */}
          <div className="mx-auto w-11/12 rounded-md bg-[#F1F2F6]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-14">
                  <h5 className="text-lg font-semibold lg:text-xl">
                    Booking Detail
                  </h5>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col text-lg">
                  <div className="mx-5 flex flex-col text-sm lg:mx-8 lg:text-lg xl:mx-14">
                    <div className="my-5 flex justify-between text-[#646D89]">
                      <div>{guestAmount} Guests (1 Night)</div>
                      <div className="text-right max-sm:flex-col">
                        <div className="inline pl-4">Payment success via</div>
                        <div className="ml-2 inline font-semibold">
                          {paymentMethodType}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <p>{roomname}</p>
                      <p className="pl-4 text-right font-semibold text-[#2A2E3F]">
                        {pricePerNight}/ต่อคืน
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <p className="text-[#646D89]">Add-on Request</p>
                      <p className="pl-4 text-right font-semibold text-[#2A2E3F]">
                        {addReqPrice} ตาราง add req
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <p className="text-[#646D89]">
                        Promotion Code ตารางโปรโมชั่น
                      </p>
                      <p className="pl-4 text-right font-semibold text-[#2A2E3F]">
                        {promotionPrice}
                      </p>
                    </div>
                    <hr className="mt-4 w-full border-[1.75px]" />
                    <div className="flex justify-between py-4">
                      <p className="text-[#646D89]">Total</p>
                      <p className="pl-4 text-right text-xl font-semibold text-[#2A2E3F]">
                        THB {bookingTotalPrice}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto w-full bg-[#E4E6ED] px-5 py-4 text-sm lg:px-8 lg:text-lg xl:px-14">
                    <p className="font-semibold text-[#2A2E3F]">
                      Additional Request
                    </p>
                    <p className="text-[#646D89]">{addReqText}</p>
                  </div>
                  {/* แก้ pb-4 ใน accordion.jsx */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="mt-4 flex w-full items-center justify-between max-sm:flex-col">
        <Link href={`/user/${userId}/booking_history/${bookingId}/cancle`}>
          <button className="visitlink">Cancle Booking</button>
        </Link>
        <div className="flex items-center max-sm:flex-col">
          <button className="visitlink px-0 max-sm:pb-3 sm:px-6">
            Room Detail
          </button>
          <div className="max-sm:pb-3">
            {/* url: /user/[user_id]/booking_history/[booking_id]/chage_date */}
            <Link
              href={`/user/${userId}/booking_history/${bookingId}/change_date`}
            >
              <PrimaryBtn btnName="Change Date" handleClick={() => {}} />
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-10 w-full border-[1.75px]" />
    </div>
  );
}
