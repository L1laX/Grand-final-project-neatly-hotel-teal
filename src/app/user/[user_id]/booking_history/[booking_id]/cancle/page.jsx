"use client";
import React, { useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Modal from "@/components/common/PopupModal";

const Page = () => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmChangeDate = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="background relative flex h-[1028px] w-auto items-center justify-center bg-gray-100">
      <div className="keywords checkin-checkout absolute left-[162px]  top-[80px] ">
        <div className="   text-[68px]">Cancel Booking</div>
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
              <div className="Room rank w[715px] mb-10 flex h-[42px] justify-between">
                <div className="h-[42px] w-[314px] text-[24px]">
                  Superrior Graden View
                </div>
                <div className="h-[24px] w-[229px] text-right text-[16px]">
                  Booking date: Tue, 16 Oct
                </div>
              </div>

              <div className="w-[715 px]   flex    h-[32px] justify-between">
                <div className=" w-[468.67px]">
                  Th, 19 Oct 2022 - Fri, 20 Oct 2022
                </div>
                <div className="w-[222.33px]  text-right">Total Refund</div>
              </div>
              <div className="w-[715 px]   flex    h-[32px] justify-between">
                <div>2 Guests</div>
                <div className="w-[222.33px]  text-right">THB 2,300.00</div>
              </div>

              <div className="w-[715 px]   mt-6    flex  h-[18px]  text-red-700 ">
                *Cancellation of the booking now will not be able to request a
                refund.
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

          <button
            className="  btn-primary mr-4"
            onClick={handleConfirmChangeDate}
          >
            Cancel this Booking
          </button>
        </div>
      </div>
      {/* Popup */}
      <Modal
        showModal={showModal}
        handleCancel={handleCancel}
        handleConfirm={handleCancel}
        modalTitle="Cancel this Booking "
        modalContent="Are you sure you want to Cancel this Booking?"
        cancelButtonText="Cancle"
        confirmButtonText="Confirm"
      />
    </div>
  );
};

export default Page;
