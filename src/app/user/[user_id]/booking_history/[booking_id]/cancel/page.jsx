"use client";
import { useEffect, useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Modal from "@/components/common/PopupModal";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import LoadingRoom from "@/components/common/LoadingRoom";

const CancelBooking = ({ params }) => {
  const router = useRouter();
  const { user_id, booking_id } = params;
  const [showModal, setShowModal] = useState(false);
  const [cancelBooking, setCancelBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCancelBooking = async () => {
    try {
      const res = await axios.get(`/api/user/booking_history/${booking_id}`);
      if (res.status === 200) {
        setIsLoading(true);
      }
      setCancelBooking(res.data.data);
      console.log(res.data.data, "Fetching Booking History");
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  const deleteBookingOrder = async () => {
    try {
      const res = await axios.put(`/api/user/booking_history/${booking_id}`);
      if (res.status === 200) {
        alert("Booking Order has been canceled");
        router.push(
          `/user/${user_id}/booking_history/${booking_id}/cancel/success`,
        );
      }
    } catch (error) {
      console.error("Failed to cancel booking order:", error);
    }
  };

  useEffect(() => {
    getCancelBooking();
  }, []);

  const handleConfirmCancel = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="canclebooking-container mx-10 my-20 py-10 md:mx-40">
        <h2 className=" mb-16">Cancel Booking</h2>
        {isLoading ? (
          <div className="booking-history flex flex-col py-10 md:flex-row md:justify-start">
            <div className=" h-[210px] w-[357px] rounded bg-slate-200">
              {Object.keys(cancelBooking).length === 0 ? (
                <p></p>
              ) : (
                <img
                  className="h-[210px] w-[357px] rounded object-cover"
                  src={
                    cancelBooking?.customerBooking_room[0]?.room?.roomMainImage
                  }
                  alt="room"
                />
              )}
            </div>

            <div className="booking-content flex flex-col md:ml-9 md:w-4/5 md:flex-row md:justify-between">
              {/* Booking Detail */}
              <div className="left">
                {Object.keys(cancelBooking).length === 0 ? (
                  <p></p>
                ) : (
                  <h3 className=" mb-10">
                    {cancelBooking?.customerBooking_room[0]?.room?.name}
                  </h3>
                )}

                <p className=" body1 mb-10 text-[#9aa1b9]">
                  {isLoading ? (
                    <>
                      {format(
                        new Date(cancelBooking?.checkInDate),
                        "eee, dd MMM yyyy",
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(cancelBooking?.checkOutDate),
                        "eee, dd MMM yyyy",
                      )}
                    </>
                  ) : null}
                  <br />
                  {cancelBooking?.guestCount} Guests
                </p>
                <p className=" body3 mb-10 text-[#B61515]">
                  *Cancellation of the booking now will not be able to request a
                  refund.
                </p>
              </div>
              <div className="right">
                <p className=" body1 text-[#9aa1b9]">
                  Booking date:{" "}
                  {isLoading ? (
                    <>
                      {format(
                        new Date(cancelBooking?.created_at),
                        "eee, dd MMM yyyy",
                      )}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <LoadingRoom />
        )}

        <hr />
        {/* Button */}
        <div className="button flex flex-row justify-between md:my-10">
          <button
            onClick={() => router.push(`/user/${user_id}/booking_history`)}
            className="visitlink"
          >
            Back
          </button>

          <PrimaryBtn
            btnName="Cancel this Booking"
            handleClick={handleConfirmCancel}
          ></PrimaryBtn>
        </div>
      </section>

      {/* Popup */}
      <Modal
        showModal={showModal}
        handleCancel={handleCancel}
        handleConfirm={() => deleteBookingOrder(booking_id)}
        handleClose={() => setShowModal(false)}
        modalTitle="Cancel Booking "
        modalContent="Are you sure you want to Cancel this Booking?"
        cancelButton="Cancel"
        confirmButton="Confirm"
      />
    </>
  );
};

export default CancelBooking;
