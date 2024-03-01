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

export function DateRangeRoomGuest({ className, handleDateRangeRoomGuest }) {

// แบบนี้วันที่ -1
  // const dateString = JSON.stringify({
  //   from: date.from?.toISOString(),
  //   to: date.to?.toISOString(),
  // });
  
  const { date,setDate,roomAndGuest,setRoomAndGuest,calendarDesign } = handleDateRangeRoomGuest;

  const dateString = JSON.stringify({
    from: date?.from ? format(date?.from, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
    to: date?.to ? format(date?.to, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
  });

  const roomAndGuestString = JSON.stringify({
    room: roomAndGuest?.room ? roomAndGuest?.room : null,
    guest: roomAndGuest?.guest ? roomAndGuest?.guest : null,
  });

  const sendValueToRoomDetails = {
    dateString,
    roomAndGuestString
  };
  console.log(sendValueToRoomDetails)
  
  // console.log(date)
  // console.log(room)
  // console.log(guest)
  // console.log(dateString)
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
                disabled={[
                  (date) => date < new Date(new Date().setHours(0, 0, 0, 0)),
                  new Date(date?.from),
                ]}
                //disabled={ [(date) => date < new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0))] }
                //disabled={ [(date) => date < new Date() ,new Date(2024, 2, 20), new Date(2024, 2, 22)] }
                //disabled={(date) => date > new Date() || date < new Date("1900-01-01") }
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
          <SelectTrigger className="h-10 w-full min-w-48 text-[#9AA1B9] outline-none transition-all duration-200 ease-in-out hover:bg-[#F1F5F9] sm:h-14">
            <span className="text-black">
              {roomAndGuest.room > 1
                ? `${roomAndGuest.room} rooms, `
                : `${roomAndGuest.room} room, `}
              {roomAndGuest.guest > 1
                ? `${roomAndGuest.guest} guests`
                : `${roomAndGuest.guest} guest`}
            </span>
          </SelectTrigger>
          <SelectContent className="mt-0.5">
            <div className="flex w-full justify-between p-2">
              <div className="flex flex-col justify-center">
                <span className="mb-1">Room</span>
              </div>
              <div className="flex w-32 justify-end">
                <button
                  disabled={roomAndGuest.room <= 1 ? true : false}
                  className={
                    roomAndGuest.room <= 1 ? "cursor-default" : "cursor-pointer"
                  }
                  onClick={() =>
                    setRoomAndGuest((prev) => ({
                      ...prev,
                      room: prev.room - 1,
                    }))
                  }
                >
                  <div
                    className={
                      roomAndGuest.room <= 1
                        ? "textCircle bg-zinc-100"
                        : "textCircle"
                    }
                  >
                    <span className="mb-[2.75px] text-lg">-</span>
                  </div>
                </button>
                <div className="inline w-10 text-center">
                  {roomAndGuest.room}
                </div>
                <button
                  onClick={() =>
                    setRoomAndGuest((prev) => ({
                      ...prev,
                      room: prev.room + 1,
                    }))
                  }
                >
                  <div class="textCircle">
                    <span className="mb-[2.75px] text-lg">+</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex w-full justify-between p-2">
              <div className="flex flex-col justify-center">
                <span className="mb-1">Guest</span>
              </div>
              <div className="flex w-32 justify-end">
                <button
                  disabled={roomAndGuest.guest <= 1 ? true : false}
                  className={
                    roomAndGuest.guest <= 1
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                  onClick={() =>
                    setRoomAndGuest((prev) => ({
                      ...prev,
                      guest: prev.guest - 1,
                    }))
                  }
                >
                  <div
                    className={
                      roomAndGuest.guest <= 1
                        ? "textCircle bg-zinc-100"
                        : "textCircle"
                    }
                  >
                    <span className="mb-[2.75px] text-lg">-</span>
                  </div>
                </button>
                <div className="inline w-10 text-center">
                  {roomAndGuest.guest}
                </div>
                <button
                  onClick={() =>
                    setRoomAndGuest((prev) => ({
                      ...prev,
                      guest: prev.guest + 1,
                    }))
                  }
                >
                  <div class="textCircle">
                    <span className="mb-[2.75px] text-lg">+</span>
                  </div>
                </button>
              </div>
            </div>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
