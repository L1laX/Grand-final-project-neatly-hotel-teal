"use client";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Modal from "@/components/common/PopupModal";
import { useRouter } from "next/navigation";
import axios from "axios";

const RefundBooking = ({ params }) => {
  const router = useRouter();
  const { user_id, booking_id } = params;
  const [showModal, setShowModal] = useState(false);
  const [refundBooking, setRefundBooking] = useState([]);

  const getRefundBooking = async () => {
    try {
      const res = await axios.get(`/api/user/booking_history/${booking_id}`);
      setRefundBooking(res.data.data);
      console.log(res.data.data, "Fetching Booking History");
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  const getRefundOrder = async () => {
    try {
      const res = await axios.delete(`/api/user/booking_history/${booking_id}`);
      if (res.status === 200) {
        alert(
          "Your refund request has been processed! We will notify you once the refund is completed.",
        );
        router.push(`/user/${user_id}/booking_history`);
      }
    } catch (error) {
      console.error("Failed to delete booking order:", error);
    }
  };

  useEffect(() => {
    getRefundBooking();
  }, []);

  const handleConfirmCancle = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="canclebooking-container mx-10 my-20 py-10 md:mx-40">
        <h2 className=" mb-16">Request a Refund</h2>
        <div className="booking-history flex flex-col py-10 md:flex-row md:justify-start">
          <div className=" h-[210px] w-[357px] rounded bg-slate-200">
            {Object.keys(refundBooking).length === 0 ? (
              <p></p>
            ) : (
              <img
                className="h-[210px] w-[357px] rounded"
                src={
                  refundBooking?.customerBooking_room[0]?.room?.roomMainImage
                }
                alt="room"
              />
            )}
          </div>
          <div className="booking-content flex flex-col md:ml-9 md:w-4/5 md:flex-row md:justify-between">
            {/* Booking Detail */}
            <div className="left">
              {Object.keys(refundBooking).length === 0 ? (
                <p></p>
              ) : (
                <h3 className=" mb-10">
                  {refundBooking?.customerBooking_room[0]?.room?.name}
                </h3>
              )}
              <p className=" body1 mb-10 text-[#646D89]">
                {refundBooking?.checkInDate} - {refundBooking?.checkOutDate}{" "}
                <br />
                {refundBooking?.guestCount} Guests
              </p>
            </div>
            <div className="right flex flex-col">
              <p className=" body1 mb-10 text-[#9aa1b9]">
                Booking date: {refundBooking?.created_at}
              </p>
              <p className=" text-right">Total Refund</p>
              <h5 className=" text-right">THB {refundBooking?.totalPrice}</h5>
            </div>
          </div>
        </div>
        <hr />
        {/* Button */}
        <div className="button flex flex-row justify-between md:my-10">
          <button
            className="visitlink"
            onClick={() => router.push(`/user/${user_id}/booking_history`)}
          >
            Back
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
        handleConfirm={() => getRefundOrder(booking_id)}
        modalTitle="Cancle and Refund this Booking"
        modalContent="Are you sure you want to cancel this booking and request a refund?"
        cancelButton="Cancle"
        confirmButton="Confirm Cancle and Refund"
      />
    </>
  );
};

export default RefundBooking;
