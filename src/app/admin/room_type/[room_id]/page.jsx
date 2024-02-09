"use client";
import React, { useEffect } from "react";
import Sidebar from "../../Sidebar/page";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";
import { useState } from "react";

const data = {
  room_id: 1,
  mainImage: "https://placehold.co/400",
  name: "Deluxe",
  status: "Vacant",
  pricePerNight: "3000",
  promotionPrice: "2500",
  galleryImage: ["https://placehold.co/400", "https://placehold.co/400"],
  guest: "2",
  bedType: "dubleBed",
  size: "32",
  description:
    "lorem ipsum dolor sit ametsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
  amenity: ["wifi", "tv", "kitchen"],
};
const page = ({ params: { room_id } }) => {
  const [values, setValues] = useState({ ...data });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("hello Admin values is ");
    console.log(values);
  };
  console.log(values);
  return (
    <div>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col">
          <NavBar
            navName={values.name}
            button={true}
            buttonName={"Update"}
            notSearch={true}
            backarrow={true}
            handleSubmit={handleSubmit}
          />
          <section className="form h-full w-full ">
            <TypeRoomAdminForm
              values={values}
              setValues={setValues}
              handleSubmit={handleSubmit}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
