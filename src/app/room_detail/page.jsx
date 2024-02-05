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
import { addDays, format } from "date-fns";
import { DateRangeRoomGuest } from "@/components/ui/DateRangeRoomGuest";
import axios from "axios";

// const [data, setData] = useState({});
// const [searchRoom, setSearchRoom] = useState(null);

export default function RoomDetail({ searchParams }) {
  const roomsType = ["1", "2", "3"];
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState(JSON.parse(searchParams.dateString));
  const [room, setRoom] = useState(parseInt(searchParams.room, 10));
  const [guest, setGuest] = useState(parseInt(searchParams.guest, 10));

  const { from: checkIn, to: checkOut } = date;

  //ถ้าไม่เปลี่ยน format เมื่อส่ง query ไป +จะหาย จาก 2024-03-30T00:00:00.000+07:00 กลายเป็น 2024-03-30T00:00:00.000 07:00
  const checkInDate = format(new Date(checkIn), "yyyy-MM-dd");
  const checkOutDate = format(new Date(checkOut), "yyyy-MM-dd");
  const getRoomList = async () => {
    const result = await axios.get(
      `http://localhost:3000/api/roomdetail?checkin=${checkInDate}&checkout=${checkOutDate}`,
    );
    setRooms(result.data);
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const handleClickSearch = () => {
    getRoomList();
  };

  // console.log(date)
  console.log(checkIn);
  console.log(checkOut);
  console.log(searchParams.room);
  console.log(searchParams.guest);
  console.log(searchParams.dateString);
  console.log(JSON.parse(searchParams.dateString));
  //console.log(format(new Date(searchParams.date.from), 'LLL dd, y'));

  // const [showContent, setShowContent] = useState(false);
  // const [showGallery, setShowGallery] = useState(false);

  // const getRoomType = async () => {
  //   try {
  //     const response = await axios.get("/api/roomtype");
  //     console.log(response.data.data);
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log("Cannot Fetching Data");
  //   }
  // };

  return (
    <main>
      {/* search-bar */}
      <div className="h-82 flex w-full justify-center rounded-lg bg-white shadow-lg md:h-44 lg:h-48 xl:h-56">
        <div className="flex w-11/12 flex-col items-center justify-around gap-2 border-4 border-double border-indigo-600 py-4 md:flex-row md:gap-8 md:px-16 lg:gap-10">
          <DateRangeRoomGuest
            handleDateRangeRoomGuest={{
              buttonName: "Search",
              calendarDesign: "h-10 sm:h-14 w-56 sm:w-full",
              buttonDesign:
                "btn-secondary btn-secondary:hover btn-secondary:active btn-secondary:disabled cursor-pointer mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1",
              date: date,
              setDate: setDate,
              room: room,
              setRoom: setRoom,
              guest: guest,
              setGuest: setGuest,
              handleClickSearch: handleClickSearch,
            }}
          />
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
