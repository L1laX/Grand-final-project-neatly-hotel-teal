"use client";

import SecondaryBtn from "@/components/common/SecondaryBtn";
import { RoomCard } from "@/components/common/RoomCard";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRangeRoomGuest } from "@/components/ui/DateRangeRoomGuest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "@/components/common/LoadingPage";

export default function RoomDetail({ searchParams }) {
  const initialDate = searchParams.dateString
    ? JSON.parse(searchParams.dateString)
    : {
        from: new Date(),
        to: addDays(new Date(), 2),
      };

  const initialRoomAndGuest = searchParams.roomAndGuestString
    ? JSON.parse(searchParams.roomAndGuestString)
    : {
        room: 1,
        guest: 2,
      };
  const [rooms, setRooms] = useState([]);
  // const [date, setDate] = useState(JSON.parse(searchParams.dateString));
  const [date, setDate] = useState(initialDate);
  const [roomAndGuest, setRoomAndGuest] = useState(initialRoomAndGuest);
  // const [room, setRoom] = useState(parseInt(searchParams.room, 10));
  // const [guest, setGuest] = useState(parseInt(searchParams.guest, 10));

  const getRoomList = async () => {
    if (!date?.from && !date?.to) {
      setDate({ from: new Date(), to: addDays(new Date(), 2) });
    } else if (date?.from && !date?.to) {
      setDate((prev) => ({
        ...prev,
        to: addDays(prev.from, 2),
      }));
    }
    const checkIn = date?.from || new Date();
    const checkOut = date?.to || addDays(checkIn, 2);
    //console.log("ccccciiiii",checkIn,"cccccoooo",checkOut)
    //ถ้าไม่เปลี่ยน format เมื่อส่ง query ไป +จะหาย จาก 2024-03-30T00:00:00.000+07:00 กลายเป็น 2024-03-30T00:00:00.000 07:00
    const checkInDate = format(new Date(checkIn), "yyyy-MM-dd");
    const checkOutDate = format(new Date(checkOut), "yyyy-MM-dd");
    const result = await axios.get(
      `/api/room_detail?checkin=${checkInDate}&checkout=${checkOutDate}&room=${roomAndGuest.room}&guest=${roomAndGuest.guest}`,
    );
    setRooms(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    if (window) {
      window.localStorage.removeItem("countDown");
    }

    getRoomList();
  }, []);

  const handleClickSearch = () => {
    const loading = toast.loading("Loading...");
    setTimeout(() => {
      getRoomList();
      toast.update(loading, {
        render: "Room List Updated!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }, 500);
  };

  // console.log(date)
  // console.log(searchParams.room)
  // console.log(searchParams.guest)
  // console.log(searchParams.dateString)
  // console.log(JSON.parse(searchParams.dateString))
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

  const dateRoomGuest = { ...date, ...roomAndGuest };

  return (
    <main>
      {/* search-bar */}
      <div className="h-82 flex w-full justify-center rounded-lg bg-white shadow-lg md:h-44 lg:h-48 xl:h-56">
        <div className="flex w-11/12 flex-col items-center justify-around gap-2 py-4 md:flex-row md:gap-8 md:px-16 lg:gap-10">
          <DateRangeRoomGuest
            handleDateRangeRoomGuest={{
              calendarDesign: "h-10 sm:h-14 w-56 sm:w-full",
              date: date,
              setDate: setDate,
              roomAndGuest: roomAndGuest,
              setRoomAndGuest: setRoomAndGuest,
            }}
          />

          <SecondaryBtn
            btnName="Search"
            secondaryButton="mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1"
            handleClick={handleClickSearch}
          />
        </div>
      </div>

      <div className="divide-y-2 divide-gray-300 lg:m-20">
        {rooms.length ? (
          rooms?.map((item, index) => (
            <RoomCard
              key={index}
              roomItem={item.id}
              roomName={item.name}
              roomImage={item.roomMainImage}
              roomGuests={item.guests}
              roomDesc={item.description}
              roomPrice={item.pricePerNight}
              roomDisc={item.discount}
              roomBedType={item.bedType}
              roomSize={item.size}
              dateRoomGuest={dateRoomGuest}
              roomAvailable={item.availableRoom}
              allRoomId={item.room_id_list}
              roomPromotionPrice={item.promotionPrice}
              roomAmenity={item.roomAmenity}
              roomGallery={item.roomGallery}
            />
          ))
        ) : (
          // Loading
          <div className="  flex flex-col items-center justify-center gap-10">
            <LoadingPage />
            <LoadingPage />
          </div>
        )}
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
