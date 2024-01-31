//// edit it
"use client";
import { useState, useEffect } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";

export default function RoomDetailById({ params }) {
  return (
    <main>
      <div className=" content-page flex flex-col ">
        <div className=" slide-room flex justify-center rounded border-2 border-white bg-gray-600">
          Room Detail By Id No.{params.room_id}
        </div>
        <div className="under-slide flex justify-center ">
          <div className="center-box  flex flex-col space-y-20">
            <div className="box-2">
              <h3 className=" room-name  text-green-800 ">
                Superior Garden View
              </h3>
              <div className="box2-2 flex flex-row justify-center space-x-10 ">
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
                <div className="2-2right  ">
                  <div className="">
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
              <div className="box2-3 ">
                <div className=" ">
                  <h2 className=" flex   text-2xl ">Room Amenities</h2>
                </div>

                <div className=" flex flex-row space-x-10">
                  <div className="left-detail  text-gray-700">
                    <li>Safe in Room</li>
                    <li>Air Conditioning</li>
                    <li>High speed internet connection</li>
                    <li>Hairdryer</li>
                    <li>Shower</li>
                    <li>Bathroom amenities</li>
                    <li>Lamp</li>
                  </div>
                  <div className=" right-detail  text-gray-700">
                    <li>Minibar</li>
                    <li>Telephone</li>
                    <li>Ironing board</li>
                    <li>A floor only accessible via a guest room key</li>
                    <li>Alarm clock</li>
                    <li>Bathrobe</li>
                  </div>
                </div>
              </div>
            </div>
            <div className="box3  ">
              <p className="   flex justify-center  text-xl ">Other Rooms</p>
              <div className="random-room  flex justify-center  rounded border-2 border-black">
                insert randoom room here
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
