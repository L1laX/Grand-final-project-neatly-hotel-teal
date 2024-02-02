"use client";

import PopupBox from "@/components/common/PopupBox";
import PopupGallery from "@/components/common/PopupGallery";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { useState } from "react";

export const RoomCard = ({
  roomitem,
  roomname,
  roomimage,
  roomguest,
  roomdesc,
  roomprice,
  roomdisc,
  roombedtype,
  roomsize,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const isVisible = () => {
    setShowContent(true);
  };

  const isGallery = () => {
    setShowGallery(true);
  };

  const handleBooking = () => {
    alert("rediect to Booking Page: /booking/id");
  };

  return (
    <>
      {/* room card : map ตรงนี้ */}
      <div>
        {roomitem}
        <div className="room-card flex flex-col justify-center gap-12 px-5 py-10 lg:flex-row">
          <div
            className=" h-[320px] w-[413px] cursor-pointer rounded-md bg-slate-200"
            onClick={() => {
              isGallery(true);
            }}
          >
            for image{roomimage}
          </div>
          <section className="room-detail flex flex-col lg:justify-between">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <h4
                  className=" cursor-pointer"
                  onClick={() => {
                    roomlink;
                  }}
                >
                  Superior Garden View : {roomname}
                </h4>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  {roomguest} Guests | {roombedtype} | {roomsize}
                </p>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  {roomdesc}
                </p>
              </div>
              <div className=" pt-5 lg:flex lg:w-1/2 lg:flex-col lg:items-end lg:pt-0">
                <p className="text-left font-sans text-base font-normal text-[#646D89] line-through">
                  THB {roomdisc}
                </p>
                <h5>THB {roomprice}</h5>

                <p className="font-sans text-base font-normal text-[#646D89] lg:text-right">
                  Per Night <br /> (Including Taxes & Fees)
                </p>
              </div>
            </div>
            <div className=" flex cursor-pointer items-center justify-center gap-5 pt-5 lg:items-center lg:justify-end">
              <p
                className=" visitlink"
                onClick={() => {
                  isVisible(true);
                }}
              >
                Room Detail
              </p>
              <PrimaryBtn btnName="Book Now" handleClick={handleBooking} />
            </div>
          </section>
          <hr />
        </div>
      </div>

      {/* Popup Room detail */}
      {isVisible && (
        <PopupBox isVisible={showContent} onClose={setShowContent} />
      )}

      {isGallery && (
        <PopupGallery isGallery={showGallery} onCloseGal={setShowGallery} />
      )}
    </>
  );
};
