"use client";
import React from "react";
import UploadPic from "@/asset/input/photo.svg";
import UploadPicSmall from "@/asset/input/uploadSmallPhoto.svg";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";
const TypeRoomAdminForm = () => {
  const [amenity, setAmenity] = useState(["A", "B", "C", "D", "E"]);

  return (
    <sction className="TyperoomForm  m-48 p-20">
      <form className="mx-20 flex flex-col  bg-slate-500 p-11">
        <div className="basic-info flex flex-col gap-5">
          <h4>Basic Information</h4>
          <div className="Roomtype flex w-full flex-col">
            <label htmlFor="roomType">Room Type *</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
            />
          </div>
          <div className="room-bedType flex gap-8">
            <div className="roomSize flex w-1/2 flex-col">
              <label htmlFor="roomSize">Room size[sqm] *</label>
              <input
                type="text"
                name="roomSize"
                className="mt-1 w-full rounded-md border border-gray-300 p-1 "
              />
            </div>
            <div className="bedType flex w-1/2 flex-col">
              <label htmlFor="bedType">Bed Type *</label>
              <select
                name="bedType"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
                defaultValue=""
              >
                <option value="" disabled>
                  bed type
                </option>
                <option value="singleBed"> single bed</option>
                <option value="dubleBed"> duble bed</option>
                <option value="dubleBed(kingSize)">duble bed(king size)</option>
                <option value="twinBed">twin bed</option>
              </select>
            </div>
          </div>
          <div className="guests flex w-[300px] flex-col">
            <label htmlFor="guests">Guest(s) *</label>
            <select
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
              name="guests"
              defaultValue=""
            >
              <option value="" disabled>
                guests count
              </option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
              <option value="6">6 guests</option>
            </select>
          </div>
          <div className="pricePerNight-promotion flex justify-between gap-8">
            <div className="pricePerNight flex w-1/3  flex-col ">
              <label htmlFor="pricePerNight">Price per Night(THB) *</label>
              <input
                type="number"
                name="pricePerNight"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
              />
            </div>
            <div className="promotionPrice mt-5 flex w-1/2 items-center justify-center">
              <input type="checkbox" className="mx-3 h-7 w-7" />
              <label htmlFor="promotionPrice" className=" mr-10 w-[300px] ">
                Promotion Price(THB)
              </label>
              <input
                type="number"
                name="promotionPrice"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
              />
            </div>
          </div>
          <div className="discription flex flex-col gap-3">
            <label htmlFor="roomDescription">Room Description *</label>
            <textarea
              name="roomDescription"
              id=""
              cols="30"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="my-10 w-full border-b-2 border-gray-300"></div>
        <div className="room-image">
          <h4>Room Image</h4>

          <div className="main-image">
            <p className="pb-2 pt-9">Main Image*</p>
            <label>
              <Image
                src={UploadPic}
                alt="background upload"
                className="cursor-pointer shadow-lg transition-transform hover:scale-105"
              />
              <input
                name="mainImage"
                type="file"
                hidden
                accept="image/*"
                multiple
              />
            </label>
          </div>

          <div className="image-gallery">
            <p className="pb-2 pt-9">Image Gallery(At least 4 pictures)*</p>
            <label className="">
              <Image
                src={UploadPicSmall}
                alt="background upload"
                className="cursor-pointer shadow-lg transition-transform hover:scale-105"
                width={120}
                height={120}
              />
              <input
                name="mainImage"
                type="file"
                hidden
                accept="image/*"
                multiple
              />
            </label>
          </div>
        </div>
        <div className="my-10 w-full border-b-2 border-gray-300"></div>
        <div className="room-amenity">
          <h4>Room Amenities</h4>
          <div className="drage-amenity-section">
            {amenity.length &&
              amenity.map((item, i) => {
                return (
                  <div className="item" key={i}>
                    {item}
                  </div>
                );
              })}
          </div>
        </div>
      </form>
    </sction>
  );
};

export default TypeRoomAdminForm;
