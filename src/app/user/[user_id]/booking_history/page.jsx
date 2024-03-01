"use client";
import BookingCard from "@/components/common/BookingCard";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import onlineBookingO from "@/asset/icons/online-booking-orange.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BookingHistory = ({ params }) => {
  const router = useRouter();
  const { user_id } = params;
  const [customerBooking, setCustomerBooking] = useState([]);

  const getBookingHistory = async () => {
    try {
      const res = await axios.get(
        `/api/user/booking_history?userId=${user_id}`,
      );

      setCustomerBooking(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const res = await axios.delete(`/api/user/booking_history/${bookingId}`);
      if (res.status === 200) {
        alert("Your booking has been canceled!");
        getBookingHistory();
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  // check if booking is within 24 hours
  const withinTwoFourHrs = (booking) => {
    const now = new Date();
    const bookingDate = new Date(booking.created_at);
    const withinHours = (now - bookingDate) / (1000 * 60 * 60);
    return withinHours < 24;
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-11/12 max-w-[1980px] flex-col lg:w-5/6">
        <h2 className="py-20 text-4xl sm:text-5xl lg:text-7xl">
          Booking History
        </h2>

        {/* Conditional Rendering List */}

        {customerBooking ? (
          customerBooking.map((booking) => {
            return (
              <BookingCard
                key={booking.id}
                bookingId={booking?.id}
                roomName={booking?.customerBooking_room[0]?.room?.name}
                bookingdate={booking?.created_at}
                customerCheckin={booking?.checkInDate}
                customerCheckout={booking?.checkOutDate}
                guestAmount={booking?.guestCount}
                paymentMethodType={booking?.paymentType}
                addReqText={booking?.additionalRequest}
                addOnReq={booking?.bookingRequest}
                paymentStatus={booking?.paymentStatus}
                promotionCode={booking?.promotionCode}
                promotionPrice={booking?.discount}
                bookingTotalPrice={booking?.totalPrice}
                pricePerNight={
                  booking?.customerBooking_room[0]?.room.pricePerNight
                }
                userId={booking?.user_id}
                roomImage={
                  booking?.customerBooking_room[0]?.room?.roomMainImage
                }
                handleDelete={() => deleteBooking(booking.id)}
                roomList={booking?.customerBooking_room}
                withinTwoFourHrs={withinTwoFourHrs(booking)}
              />
            );
          })
        ) : (
          <>
            <div className=" my-20 flex flex-col items-center">
              <Image
                className=" opacity-50"
                src={onlineBookingO}
                width={150}
                height={150}
                alt="online-booking"
              />
              <h4 className="text-[#646d89]">Your booking is empty</h4>
              <p className=" pb-4 text-[#9aa1b9]">
                Shop for hotels to plan your next trip.
              </p>
              <PrimaryBtn
                handleClick={() => router.push(`/`)}
                btnName="Search Room"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
