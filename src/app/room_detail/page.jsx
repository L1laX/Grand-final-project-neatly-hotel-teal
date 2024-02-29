"use client";

import SecondaryBtn from "@/components/common/SecondaryBtn";
import { RoomCard } from "@/components/common/RoomCard";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRangeRoomGuest } from "@/components/ui/DateRangeRoomGuest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useSearchParams } from "next/navigation";

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
  };

  useEffect(() => {
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
        <div className="flex w-11/12 flex-col items-center justify-around gap-2 border-4 border-double border-indigo-600 py-4 md:flex-row md:gap-8 md:px-16 lg:gap-10">
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
            />
          ))
        ) : (
          // Loading
          <div className="flex flex-col items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="h-8 w-8 animate-spin fill-[#c14817] text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
