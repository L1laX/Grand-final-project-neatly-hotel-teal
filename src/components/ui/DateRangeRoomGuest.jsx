"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import PrimaryBtn from "@/components/common/PrimaryBtn";

export function DateRangeRoomGuest({ className, handleDateRangeRoomGuest }) {
  //เอาไปไว้หน้า page.jsx
  // const [date, setDate] = useState({
  //   from: new Date(),
  //   to: addDays(new Date(), 3),
  // });

  // const [room, setRoom] = useState(1);
  // const [guest, setGuest] = useState(1);

// แบบนี้วันที่ -1
  // const dateString = JSON.stringify({
  //   from: date.from?.toISOString(),
  //   to: date.to?.toISOString(),
  // });
  
  const { date,setDate,room,setRoom,guest,setGuest,buttonName,buttonDesign,calendarDesign,pathname,handleClickSearch } = handleDateRangeRoomGuest;

  const dateString = JSON.stringify({
    from: date?.from ? format(date?.from, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
    to: date?.to ? format(date?.to, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
  });

  const sendValueToRoomDetails = {
    dateString,
    room,
    guest,
  };
  console.log(sendValueToRoomDetails)
  
  console.log(date)
  console.log(room)
  console.log(guest)
  console.log(dateString)
  return (
    <>
      <div className=" date-checkin-checkout flex grow flex-col">
        <p className=" font-sans text-base font-normal text-[#2a2e3f]">
          Check In - Check Out
        </p>
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  calendarDesign,
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={ [(date) => date < new Date()] }
                //disabled={ [(date) => date < new Date() ,new Date(2024, 2, 20), new Date(2024, 2, 22)] }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="room-guest-select flex flex-1 flex-col">
        <p className=" font-sans text-base font-normal text-[#2a2e3f]">
          Room & Guests
        </p>
        <Select>
          <SelectTrigger className="h-10 w-full min-w-48 text-[#9AA1B9] sm:h-14 hover:bg-[#F1F5F9] transition-all duration-200 ease-in-out">
            <span className="text-black">
              {room > 1 ? `${room} rooms, ` : `${room} room, `}
              {guest > 1 ? `${guest} guests` : `${guest} guest`}
            </span>
          </SelectTrigger>
          <SelectContent className="mt-0.5">
            <div className="flex w-full justify-between p-2">
              <div className="flex flex-col justify-center"><span className="mb-1">Room</span></div>
              <div className="border-4 border-double border-indigo-600 w-32 flex justify-end">
                <button disabled={room <= 1 ? true : false} className="cursor-pointer" onClick={() => setRoom(room - 1)}><div class="textCircle"><span className="mb-[2.75px] text-lg">-</span></div></button>
                <div className="border-4 border-double border-indigo-600 inline w-10 text-center">{room}</div>
                <button onClick={() => setRoom(room + 1)}><div class="textCircle"><span className="mb-[2.75px] text-lg">+</span></div></button>
              </div>
            </div>
            <div className="flex w-full justify-between p-2">
            <div className="flex flex-col justify-center"><span className="mb-1">Guest</span></div>
              <div className="border-4 border-double border-indigo-600 w-32 flex justify-end">
                <button disabled={guest <= 1 ? true : false} className="cursor-pointer" onClick={() => setGuest(guest - 1)}><div class="textCircle"><span className="mb-[2.75px] text-lg">-</span></div></button>
                <div className="border-4 border-double border-indigo-600 inline w-10 text-center">{guest}</div>
                <button onClick={() => setGuest(guest + 1)}><div class="textCircle"><span className="mb-[2.75px] text-lg">+</span></div></button>
              </div>
            </div>
          </SelectContent>
        </Select>
      </div>
      <Link
        href={{
          pathname: pathname || "",
          query: pathname === "" ? null : { ...sendValueToRoomDetails },
        }}
      >
        <button className={buttonDesign} onClick={handleClickSearch||null}>{buttonName}</button>
      </Link>
    </>
  );
}