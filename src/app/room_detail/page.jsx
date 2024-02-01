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

export default function RoomDetail() {
  const roomsType = ["1", "2", "3"];

  return (
    <main>
      {/* search-bar */}
      <div className="search-bar bg-white shadow-md">
        <div className="select-date flex flex-col justify-center gap-5 px-5 py-5 md:flex-row md:gap-10 md:px-56 md:py-10">
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
          <SecondaryBtn btnName="Search" />
        </div>
      </div>
      <div className="divide-y-2 divide-gray-300 lg:m-20">
        {roomsType.map((item, index) => (
          <RoomCard key={index} roomitem={item} />
        ))}
      </div>
    </main>
  );
}
