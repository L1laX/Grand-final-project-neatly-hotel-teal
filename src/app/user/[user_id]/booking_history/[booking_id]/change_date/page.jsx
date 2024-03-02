"use client";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Modal from "@/components/common/PopupModal";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import axios from "axios";
import DateOnlySelector from "@/components/ui/DateOnlySelector";

const ChangeDate = ({ params }) => {
  const router = useRouter();
  const { user_id, booking_id } = params;
  const [showModal, setShowModal] = useState(false);
  const [changeDate, setChangeDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedDate, setBookedDate] = useState([]);

  const getChangeDate = async () => {
    try {
      const res = await axios.get(`/api/user/booking_history/${booking_id}`);
      setChangeDate(res.data.data);
      setBookedDate(res.data.bookedRoom);
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };
  useEffect(() => {
    getChangeDate();
  }, []);

  const updateChangeDate = async (data) => {
    try {
      const res = await axios.put(
        `/api/user/booking_history/${booking_id}`,
        changeDate,
      );

      console.log(res);
      if (res.status === 200)
        router.push(
          `/user/${user_id}/booking_history/${booking_id}/change_date/success`,
        );
    } catch (error) {
      console.error("Error updating customer bookings:", error);
    }
  };

  const handleConfirmCancle = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  console.log("asd", changeDate?.checkInDate, changeDate?.checkOutDate);

  return (
    <>
      <section className="canclebooking-container mx-10 my-20 py-10 md:mx-40">
        <h2 className=" mb-16">
          Change Check-in
          <br />
          and Check-out Date
        </h2>
        <div className="booking-history flex flex-col py-10 lg:flex-row lg:justify-start">
          <div className=" h-[210px] w-[357px] rounded bg-slate-200">
            {Object.keys(changeDate).length === 0 ? (
              <p></p>
            ) : (
              <img
                className="h-[210px] w-[357px] rounded object-cover"
                src={changeDate?.customerBooking_room[0]?.room?.roomMainImage}
                alt="room"
              />
            )}
          </div>
          <div className="booking-content flex flex-col lg:ml-9 lg:w-4/5">
            {/* Booking Detail */}
            <section className="flex flex-col lg:flex-row lg:justify-between">
              <div className="left">
                <h3 className=" mb-10">
                  {Object.keys(changeDate).length === 0 ? (
                    <p></p>
                  ) : (
                    changeDate?.customerBooking_room[0]?.room?.name
                  )}
                </h3>
                <p className=" font-semibold text-[#424C6B]">Booking Date</p>
                <p className=" body1 mb-10 text-[#9aa1b9]">
                  {loading ? null : (
                    <>
                      {format(
                        new Date(changeDate?.checkInDate).toString(),
                        "eee, dd MMM yyyy",
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(changeDate?.checkOutDate).toString(),
                        "eee, dd MMM yyyy",
                      )}{" "}
                      <br />
                      {changeDate?.guestCount} Guests
                    </>
                  )}
                </p>
              </div>
              <p className=" body1 text-[#9aa1b9]">
                Booking date:
                {/* หรือจะใช้ loading เหมือนด้านบนก็ได้เหมือนกัน */}
                {changeDate?.created_at
                  ? format(
                      new Date(changeDate?.created_at).toString(),
                      "eee, dd MMM yyyy",
                    )
                  : null}
              </p>
            </section>
            {/* Changing Date */}

            {loading ? null : (
              <section className="changedate-container mt-6 rounded-md bg-white p-4">
                <p className=" font-semibold text-[#424C6B]">Change Date</p>
                <div className="datepicker mt-4">
                  <DateOnlySelector
                    // handleDateChange={(date) => console.log(date)}
                    checkInDate={changeDate?.checkInDate}
                    checkOutDate={changeDate?.checkOutDate}
                    bookedDate={bookedDate}
                  />
                </div>
              </section>
            )}
          </div>
        </div>
        <hr />
        {/* Button */}
        <div className="button flex flex-row justify-between lg:my-10">
          <button
            className="visitlink"
            onClick={() => router.push(`/user/${user_id}/booking_history`)}
          >
            Back
          </button>
          <PrimaryBtn
            btnName="Confirm Change Date"
            handleClick={handleConfirmCancle}
          ></PrimaryBtn>
        </div>
      </section>
      {/* Popup */}
      <Modal
        showModal={showModal}
        handleCancel={handleCancel}
        handleConfirm={() => updateChangeDate(changeDate)}
        modalTitle="Change Date "
        modalContent="Are you sure you want to change your check-in and check-out date?"
        cancelButton="No, I don't"
        confirmButton="Yes, I want to change"
      />
    </>
  );
};
export default ChangeDate;
