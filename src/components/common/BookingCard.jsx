import React from "react";
import Image from "next/legacy/image";
import SuperiorGardenView from "/src/asset/homepage/Superior-Garden-View.jpg";
import Superior from "/src/asset/homepage/Superior.jpg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addDays, format } from "date-fns";

export default function BookingCard({
  bookingId,
  roomname,
  bookingdate,
  customerName,
  customerCheckin,
  customerCheckout,
  guestAmount,
  paymentMethodType,
  addReqText,
  addReqPrice,
  promotionPrice,
  bookingTotalPrice,
  pricePerNight,
}) {
  return (
    <div className="mb-10 flex w-full flex-col ">
      {bookingId}
      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Image */}

        <div className="relative flex h-[16rem] w-11/12 md:h-[18rem] md:w-3/5 xl:w-2/5">
          {customerName}ชื่อลูกค้า
          <Image
            src={SuperiorGardenView}
            layout="fill"
            objectFit="cover"
            alt="Suite"
          />
        </div>
        {/* Booking Card Detail */}
        <div className="flex w-full flex-col ">
          <div className="flex w-full items-center justify-between  px-4 md:px-6 xl:px-14">
            <h3 className="pr-2 text-2xl lg:text-3xl xl:text-4xl">
              {roomname}ชื่อห้อง
            </h3>
            <p className="lg:text-md pl-2 text-right text-[#9AA1B9] md:text-sm xl:text-lg">
              Booking date: {format(bookingdate, "eee, dd MMM yyyy")}
            </p>
          </div>

          <div className=" lg:text-md flex w-full px-4 py-5 text-sm text-[#424C6B] max-md:justify-between md:px-6 md:py-10 xl:px-14 xl:text-lg">
            <div className="flex flex-col pr-3">
              <p className=" font-semibold">Check-in</p>
              <p>
                {customerCheckin === null
                  ? null
                  : format(customerCheckin, "eee, dd MMM yyyy")}{" "}
                | After 2:00 PM
              </p>
            </div>
            <div className="flex flex-col pl-3">
              <p className=" font-semibold">Check-out</p>
              <p>
                {customerCheckout === null
                  ? null
                  : format(customerCheckout, "eee, dd MMM yyyy")}{" "}
                | Before 12:00 PM
              </p>
            </div>
          </div>

          {/* Booking Detail */}
          <div className="mx-auto w-11/12 bg-[#F1F2F6]">
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
                      <div>{guestAmount} จำนวน Guests (1 Night)</div>
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
                        ราคาต่อคืน({pricePerNight})
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <p className="text-[#646D89]">Add-on Request</p>
                      <p className="pl-4 text-right font-semibold text-[#2A2E3F]">
                        {addReqPrice}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <p className="text-[#646D89]">Promotion Code</p>
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
        <button className="visitlink">cancle</button>
        <div className="flex items-center max-sm:flex-col">
          <button className="visitlink px-0 max-sm:pb-3 sm:px-6">
            room detail
          </button>
          <div className="max-sm:pb-3">
            <PrimaryBtn
              btnName="Change Date"
              primaryButton=""
              // handleClick={handleClickSearch} คลิกไปที่change date ผ่าน customer_booking_id
            />
          </div>
        </div>
      </div>
      <hr className="mt-10 w-full border-[1.75px]" />
    </div>
  );
}
