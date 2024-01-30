"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import SecondaryBtn from "@/components/common/SecondaryBtn";
import DatePicker from "@/components/ui/DatePicker";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoomDetail() {
  return (
    <main>
      {/* search-bar */}
      <div className="search-bar bg-white shadow">
        <div className="select-date flex flex-col justify-center gap-5 px-5 py-5 md:flex-row md:gap-10 md:px-56 md:py-10">
          <div className=" date-checkin-checkout flex flex-col">
            <p className=" font-sans text-base font-normal text-[#2a2e3f]">
              Checkin - Checkout
            </p>
            <DatePickerWithRange />
          </div>
          <div className="room-guest-select flex flex-col">
            <p className=" font-sans text-base font-normal text-[#2a2e3f]">
              Room & Guests
            </p>
            <Select>
              <SelectTrigger className="w-[180px] text-[#9AA1B9]">
                <SelectValue placeholder="1 room, 2 quests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  1 room, 2 quests *ใช้APIจากroom_id
                </SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SecondaryBtn btnName="Search" />
        </div>
      </div>{" "}
      {/* room card */}
      <div className="room-card bg-slate-400">
        <img
          className=" shadow-lg"
          src="https://placehold.co/450x320"
          alt="preview-image"
        />

        <div className="room-detail">
          <div>
            <h4>Superior Garden View</h4>
            <body1>2 Guests | 2 Double bed | 32 sqm</body1>
            <body1>
              Rooms (36sqm) with full garden views, 1 single bed, bathroom with
              bathtub & shower. 555
            </body1>
          </div>
          <div>
            <p className="font-sans text-base font-normal text-[#646D89] line-through">
              THB 3,100.00
            </p>
            <h5>THB 2,500.00</h5>
            <p>Per Night</p>
            <p>(Including Taxes & Fees)</p>
          </div>
          <div>
            <p className=" visitlink">Room Detail</p>
            <PrimaryBtn btnName="Book Now" />
          </div>
        </div>
      </div>
    </main>
  );
}
