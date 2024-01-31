"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import SecondaryBtn from "@/components/common/SecondaryBtn";
import Image from "next/legacy/image";
import hero from "/src/asset/homepage/hero.jpg";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* <PrimaryBtn btnName={"Hello"} />
<SecondaryBtn btnName={"World"} />
<h1>asd</h1>
<p className="text-sm">asd</p>
<p className="text-[100px]">asd</p> */

export default function Home() {
  return (
    <>
      <header>
        <div className="relative flex h-[26rem] max-h-full items-center justify-center sm:h-[36rem] lg:h-[48rem] xl:h-[56rem]">
          <Image src={hero} alt="Your Image" layout="fill" objectFit="cover" />
          <div className="to-94% absolute inset-0 bg-gradient-to-b from-black from-5% to-transparent"></div>
          <div className="z-10 flex h-full lg:w-5/6 w-11/12 flex-col items-center justify-evenly border-4 border-double border-indigo-600">
            <div>
              <h1 className="border-4 border-double border-indigo-600 text-center text-3xl text-white xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl">
                <p>A Best Place for Your</p>
                <p>Neatly Experience</p>
              </h1>
            </div>
            <div className="rounded-lg flex h-82 xl:h-56 lg:h-48 md:h-44 w-full flex-row border-4 border-double border-indigo-600 bg-white shadow">
              <div className="flex py-4 gap-2 lg:gap-10 md:gap-8 md:px-16 w-full flex-col md:flex-row items-center justify-around border-4 border-double border-indigo-600">
                <div className=" date-checkin-checkout flex flex-col grow">
                  <p className=" font-sans text-base font-normal text-[#2a2e3f]">
                    Check In - Check Out
                  </p>
                  <DatePickerWithRange checkInOut="h-10 sm:h-14 w-56 sm:w-full" />
                </div>
                <div className="room-guest-select flex flex-col flex-1">
                  <p className=" font-sans text-base font-normal text-[#2a2e3f]">
                    Room & Guests
                  </p>
                  <Select>
                    <SelectTrigger className="h-10 sm:h-14 w-full min-w-48 text-[#9AA1B9]">
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
                <PrimaryBtn primaryButton="mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1" btnName="Search" />
              </div>
            </div>{" "}
          </div>
        </div>
      </header>

      <section>
        <div className="flex flex-col p-4 sm:p-8 md:p-20">
          <h1 className="text-sm">Neatly Hotel</h1>
          <p>Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation with an outdoor pool, kids' club, sports facilities and a fitness centre. There is also a spa, an indoor pool and saunas. All units at the hotel are equipped with a seating area, a flat-screen TV with satellite channels, a dining area and a private bathroom with free toiletries, a bathtub and a hairdryer. Every room in Neatly Hotel features a furnished balcony. Some rooms are equipped with a coffee machine. Free WiFi and entertainment facilities are available at property and also rentals are provided to explore the area.</p>
        </div>
      </section>

      <section>
        <div className="bg-[#465C50]">
          <h2 className="text-white">Service & Facilities</h2>
        </div>
        

      </section>
    </>
  );
}
