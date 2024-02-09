"use client";
import React, { useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  const handleConfirmChangeDate = () => {
    console.log(handleConfirmChangeDate);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleCancel1 = () => {
    setShowModal(false);
  };

  return (
    <div className="background relative flex h-[1028px] w-auto items-center justify-center bg-gray-100">
      <div className="keywords checkin-checkout absolute left-[162px]  top-[80px] ">
        <div className="  mb-2 text-[68px]">Change Check-in</div>
        <div className=" text-[68px] ">and Check-out Date</div>
      </div>
      <div className="midle box  left[162px] absolute top-[308px] h-[462px] w-[1120px]   ">
        <div className="box pic and topic flex  ">
          <div className="box left picture w-[405px]">
            <img
              className=" h-[210px] w-[357px]"
              src="src\asset\image\profile.png"
            />
          </div>
          <div className="topic  h-[334px] w-[715px] pb-24 pl-0 pr-0 pt-0">
            <div className="box right flex-col justify-between">
              <div className="Room rank w[715px] mb-5 flex h-[42px] justify-between">
                <div className="h-[42px] w-[314px] text-[24px]">
                  Superrior Graden View
                </div>
                <div className="h-[24px] w-[229px] text-[16px]">
                  Booking date: Tue, 16 Oct
                </div>
              </div>

              <div className="mb-5 h-[56px] w-[468.67px]">
                Original Date
                <h6>th,19 oct 2022 - fri,20 oct 2022</h6>
              </div>
              <div className="mb-5 h-[148px] w-[715px] bg-slate-50 ">
                Change Date
                <div className="check date   ml-[16px] mt-[15px] flex h-[76px] w-[683px] justify-between">
                  <div className="checkin h-[76px] w-[313.5px] ">
                    checkin
                    <div>1</div>
                  </div>
                  <div className="checkout h-[76px] w-[313.5px] ">
                    checkout
                    <div>2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="botton box flex h-[48px] w-[1120px]  justify-between">
          <button
            className="  btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer text-[16px] text-[#E76B39]"
            onClick={handleCancel}
          >
            cancel
          </button>
          {/* Add onClick event handler */}
          <PrimaryBtn
            btnName="Confirm Change Date"
            onClick={handleConfirmChangeDate}
            value={showModal}
          />
        </div>
      </div>
      {/* Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md bg-white p-8">
            <p className="mb-4 text-xl">
              Are you sure you want to change the date?
            </p>
            <div className="flex justify-end">
              <button className="btn-secondary mr-4" onClick={handleCancel}>
                Cancel
              </button>
              {/* Use handleCancel for both buttons */}
              <PrimaryBtn btnName="Confirm" onClick={handleCancel1} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
