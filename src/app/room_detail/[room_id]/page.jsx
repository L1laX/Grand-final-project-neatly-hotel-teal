//// edit it
"use client";
import { useState, useEffect } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/legacy/image";
import BG from "@/asset/background/login-page/bg.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

export default function RoomDetailById({ params }) {
  return (
    <main>
      <div className=" content-page sm: lg: xl: flex flex-col items-center gap-5 ">
        <p className=" slide-room flex justify-center rounded border-2 border-white bg-gray-600">
          Room Detail By Id No.{params.room_id}
        </p>
        {/* ////add carousel test */}
        <div className="slide-top m-20  w-4/5  ">
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
        {/* ////slide above here vv copy from naam for adap /// */}
        <div className="under-slide justify-c flex w-3/5 items-center  ">
          <div className="center-box  flex flex-col   ">
            <div className="box-2 flex flex-col gap-10 ">
              <p className=" room-name   text-6xl text-green-800 ">
                Superior Garden View
              </p>
              <div className="box2-2 flex flex-row  gap-10 ">
                <div className="2-2left  flex flex-col  ">
                  <p className=" text-base  text-gray-700">
                    Rooms (36sqm) with full garden views, 1 single bed, bathroom
                    with bathtub & shower.
                  </p>
                  <div className="book-detail flex flex-row text-sm ">
                    <p className=" text-gray-700">2 person </p>|
                    <p className="  text-gray-700">1 Double bed </p>|
                    <p className="  text-gray-700">32 sqm </p>
                  </div>
                </div>
                <div className="2-2right flex flex-col gap-3 ">
                  <div className=" flex flex-col gap-1 ">
                    <p className="before-discount  text-gray-700 line-through">
                      THB 3,100.00
                    </p>
                    <p>THB 2,500.00</p>
                  </div>
                  <Link href="/room_detail/">
                    <PrimaryBtn btnName="Book Now" />
                  </Link>
                </div>
              </div>
              <div className=" py-5">
                <p className=" font-bold">Room Amenities</p>
                <div className="flex flex-col justify-between gap-6 p-4 md:flex-row">
                  <ul className="amenities-1 list-disc">
                    <li className="bullet-text">Safe in Room</li>
                    <li className="bullet-text">Air Conditioning</li>
                    <li className="bullet-text">
                      High speed internet connection
                    </li>
                    <li className="bullet-text">Hairdryer</li>
                    <li className="bullet-text">Shower</li>
                    <li className="bullet-text">Bathroom amenities</li>
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
            <div className="box3 flex flex-col gap-5">
              <p className="   flex justify-center  text-xl font-bold ">
                Other Rooms
              </p>
              <div className="random-room  flex justify-center  ">
                <div className="slide-randon m-20 flex items-center justify-center">
                  <Carousel>
                    <CarouselContent className="flex items-center justify-center">
                      <CarouselItem className="  relative basis-1/3">
                        <Image src={BG} />
                        <div className="absolute left-10 top-60 flex h-full w-full flex-col items-start ">
                          <h5 className="text-2xl font-bold text-white">
                            Deluxe
                          </h5>
                          <h6 className="text-base text-white">Explore Room</h6>
                        </div>
                      </CarouselItem>
                      <CarouselItem className=" relative basis-1/3">
                        <Image src={BG} />
                        <div className="absolute left-10 top-60 flex h-full w-full flex-col items-start ">
                          <h5 className="text-2xl font-bold text-white">
                            Superior
                          </h5>
                          <h6 className="text-base  text-white">
                            Explore Room
                          </h6>
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
