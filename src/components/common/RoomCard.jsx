"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Image from "next/legacy/image";
import CloseIcon from "@/asset/icons/close-outline.svg";
import BG from "@/asset/background/login-page/bg.png";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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

export const RoomCard = ({
  roomitem,
  roomName,
  roomimage,
  roomGuests,
  roomdesc,
  roomprice,
  roomdisc,
  roombedtype,
  roomsize,
  // handleBooking,
  roomAvailable,
}) => {
  const router = useRouter();
  const handleBooking = () => {
    alert("rediect to Booking Page: /booking/id");
    router.push(`/room_detail/${roomitem}`);
  };


  return (
    <div>
      {/* room card : map ตรงนี้ */}
      <div className={roomitem}>
        <div className="room-card flex flex-col justify-center gap-12 px-5 py-10 lg:flex-row">
          {/* Fullscreen Image */}
          <AlertDialog>
            <AlertDialogTrigger>
              <div className=" h-[320px] w-[413px] cursor-pointer rounded-md bg-slate-200">
                for image{roomimage}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <div className=" flex flex-row justify-between gap-5 p-4 md:ml-20">
                    <h5>Superior Garden View</h5>
                    <AlertDialogCancel>
                      <Image
                        className=" cursor-pointer"
                        src={CloseIcon}
                        width={20}
                        height={20}
                      />
                    </AlertDialogCancel>
                  </div>
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <div className="content mt-5 h-full w-full p-4 md:mx-20">
                  <Image src={roomimage} width={1080} height={920} />
                </div>
              </AlertDialogDescription>
            </AlertDialogContent>
          </AlertDialog>

          <section className="room-detail flex flex-col lg:justify-between">
            <div className="flex-col lg:flex">
              <div className="lg:w-1/2">
                <Link href={{ pathname: `/room_detail/${roomitem}` }}>
                  <h1 className=" cursor-pointer">{roomName}</h1>
                </Link>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  {roomGuests} Guests per room | {roombedtype} | {roomsize}
                </p>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  {roomdesc}
                </p>
              </div>
              <h1>availableRoom = {roomAvailable}</h1>
              <div className=" pt-5 lg:flex lg:w-1/2 lg:flex-col lg:items-end lg:pt-0">
                <p className="text-left font-sans text-base font-normal text-[#646D89] line-through">
                  THB {roomdisc}
                </p>
                <h5>THB {roomprice}</h5>

                <p className="font-sans text-base font-normal text-[#646D89] lg:text-right">
                  Per Night <br /> (Including Taxes & Fees)
                </p>
              </div>
            </div>
            {/* Popup Box */}
            <div className=" flex cursor-pointer items-center justify-center gap-5 pt-5 lg:items-center lg:justify-end">
              <AlertDialog>
                <AlertDialogTrigger>
                  <p className="visitlink">Room Detail</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className=" flex flex-row justify-between gap-5 p-4 md:ml-20">
                        <h5>{roomName}</h5>
                        <AlertDialogCancel>
                          <Image
                            className=" cursor-pointer"
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
                      {/* Carousel */}
                      <div className=" px-5 md:px-0">
                        <Carousel>
                          <CarouselContent>
                            <CarouselItem className="basis-1/3">
                              <Image src={BG} />
                            </CarouselItem>
                            <CarouselItem className="basis-1/3">
                              <Image src={BG} />
                            </CarouselItem>
                            <CarouselItem className="basis-1/3">
                              <Image src={BG} />
                            </CarouselItem>
                            <CarouselItem className="basis-1/3">
                              <Image src={BG} />
                            </CarouselItem>
                          </CarouselContent>
                          <CarouselNext />
                          <CarouselPrevious />
                        </Carousel>
                      </div>
                      <div className="content-detail divide-y-2 divide-gray-300 p-4">
                        <div className=" py-5">
                          <p className="font-sans text-base font-normal text-[#646D89]">
                            {roomGuests} Guests | {roombedtype} | {roomsize}
                          </p>
                          <p className="font-sans text-base font-normal text-[#646D89]">
                            {roomdesc}
                          </p>
                        </div>
                        <div className=" py-5">
                          <h5 className=" text-black">Room Amenities</h5>
                          <div className="flex flex-col justify-between gap-6 p-4 md:flex-row">
                            <ul className="amenities-1 list-disc">
                              <li className="bullet-text">Safe in Room</li>
                              <li className="bullet-text">Air Conditioning</li>
                              <li className="bullet-text">
                                High speed internet connection
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

              <PrimaryBtn
                btnName="Book Now"
                handleClick={(item) => {
                  const path = `/booking/${item.roomName}${item.checkIn}${item.checkOut}${item.roomReserve}${item.guestReserve}${item.roomitem}`;
                  const queryString = urlSearchParams.toString();
                  const url = String(path) + "?" + queryString;
                  Router.push(url);
                }}
              />
            </div>
          </section>
          <hr />
        </div>
      </div>
    </div>
  );
};
