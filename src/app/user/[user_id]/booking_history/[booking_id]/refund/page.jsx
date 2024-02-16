"use client";
import React, { useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/PopupModal";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleConfirmChangeDate = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleRefundSuccess = () => {
    router.push("/user/[user_id]/booking_history/[booking_id]/refund/success");
  };

  return (
    <div className="background relative flex h-[1028px] w-auto items-center justify-center bg-gray-100">
      <div className="keywords checkin-checkout absolute left-[162px] top-[80px] ">
        <div className="text-[68px]">Request a Refund </div>
      </div>
      <div className="midle box  left[162px] absolute top-[308px] h-[462px] w-[1120px]   ">
        <div className="box pic and topic flex  ">
          <div className="box left picture w-[405px]">
            <img
              className="h-[210px] w-[357px]"
              src="src\asset\image\profile.png"
            />
          </div>
          <div className="topic h-[334px] w-[715px] pb-24 pl-0 pr-0 pt-0">
            <div className="box right flex-col justify-between">
              <div className="Room rank mb-10 flex h-[42px] w-[715px] justify-between">
                <div className="h-[42px] w-[314px] text-[24px]">
                  Superrior Graden View
                </div>
                <div className="h-[24px] w-[229px] text-right text-[16px]">
                  Booking date: Tue, 16 Oct
                </div>
              </div>

              <div className="w-[715 px] flex h-[32px] justify-between">
                <div className="w-[468.67px]">
                  Th, 19 Oct 2022 - Fri, 20 Oct 2022
                </div>
                <div className="w-[222.33px] text-right">Total Refund</div>
              </div>
              <div className="w-[715 px] flex h-[32px] justify-between">
                <div>2 Guests</div>
                <div className="w-[222.33px] text-right">THB 2,300.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="botton box flex h-[48px] w-[1120px] justify-between">
          <button
            className="btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer text-[16px] text-[#E76B39]"
            onClick={handleCancel}
          >
            cancel
          </button>
          {/* Add onClick event handler */}
          <button
            className="btn-primary mr-4"
            onClick={handleConfirmChangeDate}
          >
            Cancel and Refund this Booking
          </button>
        </div>
      </div>
      {/* Popup */}
      <Modal
        showModal={showModal}
        handleCancel={handleCancel}
        handleConfirm={handleRefundSuccess}
        modalTitle="Request a Refund "
        modalContent="Are you sure you want to Request a Refund?"
        cancelButtonText="cancle"
        confirmButtonText="Confirm"
      />
    </div>
  );
};

export default Page;
