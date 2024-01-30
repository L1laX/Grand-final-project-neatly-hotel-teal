//// edit it
"use client";
import { useState, useEffect } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";

export default function RoomDetailById({ params }) {
  return (
    <main>
      <div className=" header-content bg-black xl:bg-red-500">
        <h5 className=" flex justify-center bg-gray-600">
          Room Detail By Id No.{params.room_id}
        </h5>
        <div className="box2">
          <h3 className=" room-name flex justify-center text-2xl ">
            Superior Garden View
          </h3>
          <div className="box2-2 flex justify-center ">
            <div className="2-2left">
              <p className=" text-base ">
                Rooms (36sqm) with full garden views, 1 single bed, bathroom
                with bathtub & shower.
              </p>
              <div className="book-detail flex flex-row text-sm ">
                <p>2 person </p>|<p>1 Double bed </p>|<p>32 sqm </p>
              </div>
            </div>
            <div className="2-2right">
              <div className="">
                <p>THB 3,100.00</p>
                <p>THB 2,500.00</p>
              </div>
              <PrimaryBtn btnName="Book Now" />
            </div>
          </div>
          <div className="box2-3">
            <h2 className="   ">Room Amenities</h2>
            <div className=" flex flex-row justify-center space-x-10">
              <div>
                <li>Safe in Room</li>
                <li>Air Conditioning</li>
                <li>High speed internet connection</li>
                <li>Hairdryer</li>
                <li>Shower</li>
                <li>Bathroom amenities</li>
                <li>Lamp</li>
              </div>
              <div>
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
        <div className="box3">
          <h1 className="   flex justify-center">Other Rooms</h1>
          <div className="random-room  flex justify-center">
            insert randoom room here
          </div>
        </div>
      </div>
    </main>
  );
}
