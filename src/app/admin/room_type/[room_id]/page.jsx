"use client";
import React from "react";
import Sidebar from "../../Sidebar/page";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";

const data = {
  room_id: 1,
  image: "https://placehold.co/400",
  roomtype: "Deluxe",
  price: "3000",
  promotionPrice: "2500",
  guest: "2",
  bedType: "Double Bed",
  roomSize: "32 sqm",
};
const page = ({ params: { room_id } }) => {
  return (
    <div>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col">
          <NavBar
            navName={data.roomtype}
            button={true}
            buttonName={"Update"}
            notSearch={true}
            backarrow={true}
          />
          <div className="from h-full w-full ">
            <TypeRoomAdminForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
