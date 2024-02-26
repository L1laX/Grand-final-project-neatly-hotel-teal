"use client";
import BookingCard from "@/components/common/BookingCard";
import axios from "axios";
import { useEffect, useState } from "react";

const BookingHistory = ({ params }) => {
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

  useEffect(() => {
    getBookingHistory();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex w-11/12 max-w-[1980px] flex-col lg:w-5/6">
        <h2 className="py-20 text-4xl sm:text-5xl lg:text-7xl">
          Booking History
        </h2>

        {/* Conditional Rendering List */}

        {customerBooking &&
          customerBooking.map((booking) => {
            return (
              <BookingCard
                key={booking.id}
                customerName={booking?.customerName}
                roomname={booking?.customerBooking_room[0]?.room?.name}
                bookingdate={booking?.created_at}
                customerCheckin={booking?.checkInDate}
                customerCheckout={booking?.checkOutDate}
                guestAmount={booking?.guestCount}
                paymentMethodType={booking?.paymentType}
                addReqText={booking?.additionalRequest}
                addReqPrice={booking?.additionalRequest}
                promotionPrice={booking?.promotionCode}
                bookingTotalPrice={booking?.totalPrice}
                pricePerNight={
                  booking?.customerBooking_room[0]?.room.pricePerNight
                }
                userId={booking?.user_id}
                bookingId={booking?.id}
              />
            );
          })}
        {/* <BookingCard /> */}
      </div>
    </div>
  );
};

export default BookingHistory;
