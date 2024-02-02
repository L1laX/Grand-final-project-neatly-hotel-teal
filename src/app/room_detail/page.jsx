"use client";

import SecondaryBtn from "@/components/common/SecondaryBtn";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomCard } from "@/components/common/RoomCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RoomDetail() {
  const roomsType = ["1", "2", "3"];
  const [rooms, setRooms] = useState([]);

  const getRoom = async () => {
    const result = await axios.get("/api/roomdetail");
    console.log(result.data);
    setRooms(result.data);
  };

  useEffect(() => {
    getRoom();
  }, []);

  const [searchRoom, setSearchRoom] = useState(false);

  return (
    <main>
      {/* search-bar */}
      <div className="search-bar bg-white shadow-md">
        <div className="select-date flex flex-col justify-center gap-5 px-5 py-5 md:flex-row md:gap-10 md:px-56 md:py-10">
          {/* search : CheckIn - Check-Out */}
          <div className=" date-checkin-checkout flex flex-col">
            <p className=" font-sans text-base font-normal text-[#2a2e3f]">
              Checkin - Checkout +
            </p>
            <DatePickerWithRange />
          </div>
          <div className="room-guest-select flex flex-col">
            <p className=" font-sans text-base font-normal text-[#2a2e3f]">
              Room & Guests
            </p>
            {/* selection : map ตรงนี้ */}
            <Select>
              <SelectTrigger className="w-[180px] text-[#9AA1B9]">
                <SelectValue placeholder="1 room, 2 quests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  1 room, 2 guests *ใช้APIจากroom_id
                </SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SecondaryBtn btnName="Search" handleClick={setSearchRoom} />
        </div>
      </div>
      <div className="divide-y-2 divide-gray-300 lg:m-20">
        {rooms.map((item) => {
          console.log(item.id);
          return (
            <RoomCard
              key={item.id}
              roomitem={item.id}
              roomname={item.name}
              roomimage={item.roomMainImage}
              roomguest={item.guests}
              roomdesc={item.description}
              roomprice={item.pricePerNight}
              roomdisc={item.promotionPrice}
              roombedtype={item.bedType}
              roomsize={item.size}
            />
          );
        })}
      </div>
    </main>
  );
}
