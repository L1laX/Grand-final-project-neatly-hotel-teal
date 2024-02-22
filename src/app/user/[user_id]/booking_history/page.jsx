"use client";
import BookingCard from "@/components/common/BookingCard";
import axios from "axios";
import { useEffect, useState } from "react";

const BookingHistory = ({ user_id }) => {
  // ต้องใช้ searchParams [user_id] และ [bookind_id]
  // const user_id = searchParams.user_id;
  // const booking_id = searchParams.booking_id;
  // const path = `/user/${user_id}/booking_history/${booking_id}`;
  // const url =
  //   String(path) + "?user_id=" + user_id + "&booking_id=" + booking_id;

  // const user_id = searchParams.user_id;

  // const path = `/user/${user_id}/booking_history/`;
  // const url = String(path) + "?user_id=" + user_id;

  const [customerBooking, setCustomerBooking] = useState("");

  const getBookingHistory = async () => {
    try {
      const res = await axios.get(`/api/admin/customer_booking/${user_id}/`);
      console.log(res.data.data);
      setCustomerBooking(res.data.data);
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  console.log(customerBooking);

  useEffect(() => {
    getBookingHistory();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex w-11/12 max-w-[1980px] flex-col lg:w-5/6">
        <h2 className="py-20 text-4xl sm:text-5xl lg:text-7xl">
          Booking History
        </h2>
        <h3>{customerBooking?.customerName}</h3>
        {/* Conditional Rendering List */}
        <BookingCard />
      </div>
    </div>
  );
};

export default BookingHistory;
