"use client";

import PopupBox from "@/components/common/PopupBox";
import PopupGallery from "@/components/common/PopupGallery";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import SecondaryBtn from "@/components/common/SecondaryBtn";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function RoomDetail() {
  const [showContent, setShowContent] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <main>
      {/* search-bar */}
      <div className="search-bar bg-white shadow-md">
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
            {/* selection */}
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
      </div>
      {/* room card */}
      <div className="divide-y-2 divide-gray-300 lg:m-20">
        <div className="room-card flex flex-col justify-center gap-12 px-5 py-10 lg:flex-row">
          {/* เมื่อ click จะแสดง Popuup Room_Gallery */}
          <div
            className=" h-[320px] w-[413px] cursor-pointer bg-slate-200"
            onClick={() => {
              setShowGallery(true);
            }}
          >
            for image
          </div>
          <section className="room-detail flex flex-col lg:justify-between">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <h4>Superior Garden View</h4>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  2 Guests | 2 Double bed | 32 sqm
                </p>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  Rooms (36sqm) with full garden views, 1 single bed, bathroom
                  with bathtub & shower. 555
                </p>
              </div>
              <div className=" pt-5 lg:flex lg:w-1/2 lg:flex-col lg:items-end lg:pt-0">
                <p className="text-left font-sans text-base font-normal text-[#646D89] line-through">
                  THB 3,100.00
                </p>
                <h5>THB 2,500.00</h5>

                <p className="font-sans text-base font-normal text-[#646D89] lg:text-right">
                  Per Night <br /> (Including Taxes & Fees)
                </p>
              </div>
            </div>
            <div className=" flex items-center justify-center gap-5 pt-5 lg:items-center lg:justify-end">
              {/* Room Detail จะต้อง clickแล้วมี popup */}
              <p
                className=" visitlink"
                onClick={() => {
                  setShowContent(true);
                }}
              >
                Room Detail
              </p>
              <PrimaryBtn btnName="Book Now" />
            </div>
          </section>
          <hr />
        </div>
      </div>

      {/* Popup Room detail */}
      <PopupBox
        isVisible={showContent}
        onClose={() => {
          setShowContent(false);
        }}
      />

      <PopupGallery
        isGallery={showGallery}
        onCloseGal={() => {
          setShowGallery(false);
        }}
      />
    </main>
  );
}
