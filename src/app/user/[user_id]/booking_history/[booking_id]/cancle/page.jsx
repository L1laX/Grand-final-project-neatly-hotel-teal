"use client";
import React, { useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Modal from "@/components/common/PopupModal";

const CancleBooking = () => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmCancle = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="canclebooking-container mx-10 my-20 py-10 md:mx-40">
        <h2 className=" mb-16">Cancle Booking</h2>
        <div className="booking-history flex flex-col py-10 md:flex-row md:justify-start">
          <div className=" h-[210px] w-[357px] rounded bg-slate-200">image</div>
          <div className="booking-content flex flex-col md:ml-9 md:w-4/5 md:flex-row md:justify-between">
            {/* Booking Detail */}
            <div className="left">
              <h3 className=" mb-10">Superior Garden View</h3>
              <p className=" body1 mb-10 text-[#9aa1b9]">
                Th, 19 Oct 2022 - Fri, 20 Oct 2022 <br />2 Guests
              </p>
              <p className=" body3 mb-10 text-[#B61515]">
                *Cancellation of the booking now will not be able to request a
                refund.
              </p>
            </div>
            <div className="right">
              <p className=" body1 text-[#9aa1b9]">
                Booking date: Tue, 16 Oct 2022
              </p>
            </div>
          </div>
        </div>
        <hr />
        {/* Button */}
        <div className="button flex flex-row justify-between md:my-10">
          <button className="visitlink" onClick={handleCancel}>
            Cancle
          </button>
          <PrimaryBtn
            btnName="Cancle this Booking"
            handleClick={handleConfirmCancle}
          ></PrimaryBtn>
        </div>
      </section>

      {/* Popup */}
      <Modal
        showModal={showModal}
        handleCancel={handleCancel}
        handleConfirm={handleCancel}
        modalTitle="Cancel Booking "
        modalContent="Are you sure you want to Cancel this Booking?"
        cancelButton="Cancle"
        confirmButton="Confirm"
      />
    </>
  );
};

export default CancleBooking;
