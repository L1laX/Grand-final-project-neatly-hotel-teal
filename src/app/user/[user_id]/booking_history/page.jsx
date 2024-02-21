import BookingCard from "@/components/common/BookingCard";

const BookingHistory = ({ params: customerId }) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-11/12 max-w-[1980px] flex-col lg:w-5/6">
        <h2 className="py-20 text-4xl sm:text-5xl lg:text-7xl">
          Booking History
        </h2>
        {/* Conditional Rendering List */}
        <BookingCard />
      </div>
    </div>
  );
};

export default BookingHistory;
