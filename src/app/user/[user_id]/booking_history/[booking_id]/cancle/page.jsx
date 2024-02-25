"use client";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Modal from "@/components/common/PopupModal";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";

const CancleBooking = ({ params }) => {
  const { user_id } = params;
  const [showModal, setShowModal] = useState(false);
  const [cancleBooking, setCancleBooking] = useState([]);
  console.log(cancleBooking);

  const getCancleBooking = async () => {
    try {
      const res = await axios.get(`/api/test/${user_id}`);
      setCancleBooking(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  useEffect(() => {
    getCancleBooking();
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
        <h2 className=" mb-16">Cancle Booking</h2>
        <div className="booking-history flex flex-col py-10 md:flex-row md:justify-start">
          <div className=" h-[210px] w-[357px] rounded bg-slate-200">image</div>
          <div className="booking-content flex flex-col md:ml-9 md:w-4/5 md:flex-row md:justify-between">
            {/* Booking Detail */}
            <div className="left">
              <h3 className=" mb-10">
                Superior Garden View{cancleBooking[0]?.name}
              </h3>
              <p className=" body1 mb-10 text-[#9aa1b9]">
                {cancleBooking[0]?.checkInDate === null
                  ? null
                  : format(cancleBooking[0]?.checkInDate, "eee, dd MMM yyyy -")}
                {cancleBooking[0]?.checkOutDate === null
                  ? null
                  : format(cancleBooking[0]?.checkOutDate, " eee, dd MMM yyyy")}
                <br />
                {cancleBooking[0]?.guestCount} Guests
              </p>
              <p className=" body3 mb-10 text-[#B61515]">
                *Cancellation of the booking now will not be able to request a
                refund.
              </p>
            </div>
            <div className="right">
              <p className=" body1 text-[#9aa1b9]">
                Booking date:
                {cancleBooking[0]?.created_at === null
                  ? null
                  : format(cancleBooking[0]?.created_at, " eee, dd MMM yyyy -")}
              </p>
            </div>
          </div>
        </div>
        <hr />
        {/* Button */}
        <div className="button flex flex-row justify-between md:my-10">
          <Link href={`/user/${cancleBooking[0]?.user_id}/booking_history/`}>
            <button className="visitlink">Back</button>
          </Link>

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
