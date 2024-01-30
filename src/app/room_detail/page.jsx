import PrimaryBtn from "@/components/common/PrimaryBtn";
import SecondaryBtn from "@/components/common/SecondaryBtn";
import DatePicker from "@/components/ui/DatePicker";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

export default function RoomDetail() {
  return (
    <main>
      <h5>Room Detail Page</h5>
      <div className="search-bar bg-white shadow">
        <div className="select-date flex flex-col">
          <div className=" flex flex-col">
            <p className=" font-sans text-base font-normal text-[#2a2e3f]">
              Checkin - Checkout
            </p>
            <DatePicker />
            <DatePickerWithRange />
          </div>

          <SecondaryBtn btnName="Search" />
        </div>
        *เดี๊ยวค่อยเอาไปใส่component
      </div>
      <div className="room-card">
        <img
          className=" shadow-lg"
          src="https://placehold.co/450x320"
          alt="preview-image"
        />
        <div className="room-detail">
          <div>
            <h4>Superior Garden View</h4>
            <body1>2 Guests | 2 Double bed | 32 sqm</body1>
            <body1>
              Rooms (36sqm) with full garden views, 1 single bed, bathroom with
              bathtub & shower. 555
            </body1>
          </div>
          <div>
            <p>THB 3,100.00</p>
            <h2>THB 2,500.00</h2>
            <p>Per Night</p>
            <p>(Including Taxes & Fees)</p>
          </div>
          <div>
            <p className=" visitlink">Room Detail</p>
            <PrimaryBtn btnName="Book Now" />
          </div>
        </div>
      </div>
    </main>
  );
}
