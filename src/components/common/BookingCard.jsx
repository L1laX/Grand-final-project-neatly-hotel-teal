import React, { use } from "react";
import Image from "next/legacy/image";
import CloseIcon from "@/asset/icons/close-outline.svg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/PopupModal";
import { format, set } from "date-fns";
import { useState, useEffect } from "react";
export default function BookingCard({
  bookingId,
  roomName,
  bookingdate,
  customerCheckin,
  customerCheckout,
  guestAmount,
  paymentMethodType,
  addReqText,
  addOnReq,
  paymentStatus,
  promotionPrice,
  promotionCode,
  bookingTotalPrice,
  pricePerNight,
  userId,
  roomImage,
  handleDelete,
  bedType,
  roomList,
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const isTwoFourHrs = (hours) => {
    const now = new Date();
    const userBookingDate = new Date(bookingdate);
    const withinHours = (now - userBookingDate) / (1000 * 60 * 60);
    return withinHours < hours;
  };

  const isCheckin = (checkin) => {
    const now = new Date();
    const userCheckin = new Date(checkin);

    return now - userCheckin < 0;
  };

  console.log("isCheckin", isCheckin(customerCheckin));

  const customerInfo = {
    checkin: customerCheckin,
    checkout: customerCheckout,
    id: bookingId,
  };

  console.log("customerInfo**********", customerInfo);

  return (
    <div className="mb-10 flex w-full flex-col ">
      <p className=" text-sm text-[#9AA1B9]">
        Booking ID: {bookingId.slice(0, 13)}*****
      </p>

      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Image */}
        <div className="relative rounded-md">
          <img
            className="h-[320px] w-[453px] rounded-md object-cover"
            src={roomImage}
            alt="room"
          />
        </div>
        {/* Booking Card Detail Checkin-Checkout */}
        <div className="flex flex-col md:ml-12 md:w-2/3">
          <div className="mt-4 flex w-full flex-col justify-between md:mt-0 md:flex-row">
            <h3 className=" text-2xl lg:text-3xl xl:text-4xl">{roomName}</h3>
            <div>
              <p className="text-[#9AA1B9] md:text-right">
                Booking date: {format(bookingdate, "eee, dd MMM yyyy")}
              </p>
              {paymentStatus === "canceled" ? (
                <p className="text-[#9AA1B9] md:text-right">
                  Cancellation date: {format(bookingdate, "eee, dd MMM yyyy")}
                </p>
              ) : null}
              {paymentStatus !== "canceled" &&
              isCheckin(customerCheckin) === false ? (
                <p className="text-[#9AA1B9] md:text-right">Checked In</p>
              ) : null}
            </div>
          </div>

          <div className=" lg:text-md flex w-full py-5 text-sm text-[#424C6B] max-md:justify-between md:py-10 xl:text-lg">
            <div className=" ml-4 flex flex-col pr-3">
              <p className=" font-semibold">Check-in</p>
              <p>
                {customerCheckin === null
                  ? null
                  : format(customerCheckin, "eee, dd MMM yyyy ")}
                | After 2:00 PM
              </p>
            </div>
            <div className="flex flex-col pl-3">
              <p className=" font-semibold">Check-out</p>
              <p>
                {customerCheckout === null
                  ? null
                  : format(customerCheckout, "eee, dd MMM yyyy ")}
                | Before 12:00 PM
              </p>
            </div>
          </div>

          {/* Booking Detail and Accordion */}
          <div className=" rounded-md bg-[#F1F2F6]">
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
                      <p>{roomName}</p>
                      <p className="pl-4 text-right font-semibold text-[#2A2E3F]">
                        {pricePerNight}
                      </p>
                    </div>
                    <div className="mt-4">
                      {addOnReq.length === 0 ? null : (
                        <>
                          <p className="text-[#646D89]">Add-on Request :</p>
                          {addOnReq.map((item) => (
                            <div className=" flex flex-row justify-between">
                              <p className="text-[#646D89]">- {item?.name}</p>
                              <p className=" font-semibold">{item?.price}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    {/* Promotion Code */}
                    <div className="mt-4">
                      <p className="text-[#646D89]">Promotion Code :</p>
                      {promotionCode === null ? (
                        <div className="flex flex-row justify-between">
                          <p className="text-[#646D89]">{promotionCode}</p>
                          <p className="pl-4 text-right font-semibold text-[#2A2E3F]">
                            {promotionPrice}
                          </p>
                        </div>
                      ) : null}
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

      {/* Button Panel and Popup Room detail */}
      <div className="mt-4 flex w-full items-center justify-between max-sm:flex-col">
        {/* Cancel Booking Button */}
        <div>
          {paymentStatus === "canceled" ||
          isCheckin(customerCheckin) === false ? (
            <button
              className="visitlink"
              disabled={true}
              onClick={() => setShowModal(true)}
            >
              Cancel Booking
            </button>
          ) : (
            <button
              className="visitlink"
              disabled={false}
              onClick={() => setShowModal(true)}
            >
              Cancel Booking
            </button>
          )}

          {/* Delete Button : เดี๊ยวcommentออก */}
          <button className="visitlink ml-4" onClick={handleDelete}>
            delete
          </button>
        </div>

        {/* Popup Room Detail */}
        <div className="flex items-center max-sm:flex-col">
          {roomList.map((customerRoom, index) => (
            <div key={index} className=" mr-4">
              <AlertDialog>
                <AlertDialogTrigger>
                  <p className="visitlink">Room Detail</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className=" flex flex-row justify-between gap-5 p-4 md:ml-20">
                        <h5>{customerRoom.room.name}</h5>

                        <AlertDialogCancel>
                          <Image
                            className="cursor-pointer"
                            src={CloseIcon}
                            width={20}
                            height={20}
                          />
                        </AlertDialogCancel>
                      </div>
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    <div className="content mt-5 p-4 md:mx-20">
                      <div className="px-5 md:px-0">
                        <Carousel>
                          <CarouselContent>
                            <CarouselItem className="basis-1/3">
                              <img
                                src={customerRoom.room.roomMainImage}
                                alt="room"
                                onClick={() =>
                                  router.push(
                                    `${customerRoom.room.roomMainImage}`,
                                  )
                                }
                              />
                            </CarouselItem>

                            {/* <CarouselItem className="basis-1/3">
                            <Image src={BG} />
                          </CarouselItem>
                          <CarouselItem className="basis-1/3">
                            <Image src={BG} />
                          </CarouselItem>
                          <CarouselItem className="basis-1/3">
                            <Image src={BG} />
                          </CarouselItem> */}
                          </CarouselContent>
                          <CarouselNext />
                          <CarouselPrevious />
                        </Carousel>
                      </div>
                      <div className="content-detail divide-y-2 divide-gray-300 p-4">
                        <div className="py-5">
                          <p className="font-sans text-base font-normal text-[#646D89]">
                            {customerRoom.room.guests} Guests |{" "}
                            {customerRoom.room.bedType} |{" "}
                            {customerRoom.room.size} sqm
                          </p>
                          <p className="font-sans text-base font-normal text-[#646D89]">
                            {customerRoom.room.description}
                          </p>
                        </div>
                        <div className="py-5">
                          <h5 className="text-black">Room Amenities</h5>
                          <div className="flex flex-col justify-between gap-6 p-4 md:flex-row">
                            <ul className="amenities-1 list-disc">
                              <li className="bullet-text">Safe in Room</li>
                              <li className="bullet-text">Air Conditioning</li>
                              <li className="bullet-text">
                                High-speed internet connection
                              </li>
                              <li className="bullet-text">Hairdryer</li>
                              <li className="bullet-text">Shower</li>
                              <li className="bullet-text">
                                Bathroom amenities
                              </li>
                              <li className="bullet-text">Lamp</li>
                            </ul>
                            <ul className="amenities-2 list-disc">
                              <li className="bullet-text">Minibar</li>
                              <li className="bullet-text">Telephone</li>
                              <li className="bullet-text">Ironing board</li>
                              <li className="bullet-text">
                                A floor only accessible via a guest room key
                              </li>
                              <li className="bullet-text">Alarm clock</li>
                              <li className="bullet-text">Bathrobe</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}

          {/* Change Date Button */}
          <div className="max-sm:pb-3">
            {paymentStatus === "canceled" ||
            isCheckin(customerCheckin) === false ? (
              <PrimaryBtn
                disabled={true}
                btnName="Change Date"
                handleClick={() =>
                  router.push(
                    `/user/${userId}/booking_history/${bookingId}/change_date`,
                  )
                }
              />
            ) : (
              <PrimaryBtn
                disabled={false}
                btnName="Change Date"
                handleClick={() =>
                  router.push(
                    `/user/${userId}/booking_history/${bookingId}/change_date`,
                  )
                }
              />
            )}
          </div>
        </div>
      </div>

      <hr className="mt-10 w-full border-[1.75px]" />

      {/* Popup for Cancel Booking */}
      {isTwoFourHrs(24) ? (
        <Modal
          showModal={showModal}
          handleCancel={() =>
            router.push(`/user/${userId}/booking_history/${bookingId}/refund`)
          }
          handleConfirm={() => {
            setShowModal(false);
          }}
          handleClose={() => setShowModal(false)}
          modalTitle="Cancel Booking"
          modalContent="Are you sure you would like to cancel this booking?"
          cancelButton="Yes, I want to cancel and request a refund"
          confirmButton="No, Don't cancel"
        />
      ) : (
        <Modal
          showModal={showModal}
          handleCancel={() =>
            router.push(`/user/${userId}/booking_history/${bookingId}/cancel`)
          }
          handleConfirm={() => {
            setShowModal(false);
          }}
          handleClose={() => setShowModal(false)}
          modalTitle="Cancel Booking"
          modalContent="Cancellation of the booking now will not be able to request a refund.
        Are you sure you would like to cancel this booking?"
          cancelButton="Yes, I want to cancel"
          confirmButton="No, Don't cancel"
        />
      )}
    </div>
  );
}
