import React from "react";
import { format, addDays, eachDayOfInterval } from "date-fns";
import PrimaryBtn from "./PrimaryBtn";
import { useRouter } from "next/navigation";

const SubmitTotal = ({ values }) => {
  const router = useRouter();
  return (
    <>
      <div className="result-order mx-10 my-20 flex flex-col items-center rounded-sm bg-[#2F3E35] xl:mx-[351px]">
        <div className="result-header p-10">
          <h3 className=" text-center text-white">Thank you for booking</h3>
          <p className=" mt-3 text-center text-sm text-[#abc0b4]">
            We are looking forward to hosting you at our place.
            <br /> We will send you more information about check-in and staying
            at our Neatly
            <br /> closer to your date of reservation
          </p>
        </div>
        <div className="reserved-result-room flex w-full flex-col items-center divide-y-[1px] divide-[#5d7b6a] bg-[#465C50]">
          <div className="date-booking-form mx-10 my-6 flex w-5/6 flex-col rounded-sm">
            <div className="booking-date flex flex-row justify-between rounded bg-[#5D7B6A] p-6">
              <h5 className=" font-medium text-white">
                {format(values?.checkInDate, "eee, dd MMM yyyy")} -
                {format(values?.checkOutDate, "eee, dd MMM yyyy")}
                <p className=" body1 text-white">{values.guestCount} Guests</p>
              </h5>
              <h5 className=" font-medium text-white">
                Check-in
                <p className="body1 text-white">After Tue, 16 Oct 2022</p>
              </h5>
              <h5 className=" font-medium text-white">
                Check-out
                <p className="body1 text-white">Before Tue, 16 Oct 2022</p>
              </h5>
            </div>

            <div className="list-result flex flex-col ">
              <div className="payment-success my-10 flex flex-row justify-end gap-5 text-[#D5DFDA]">
                <p>Payment successs via</p>
                <p className=" font-medium">
                  {+values.paymentType
                    ? `Credit Card ${values.paymentType}`
                    : "QR Code"}
                </p>
              </div>
              {/* Room Name */}
              <ol className="body1 text-[#D5DFDA]">
                <li className=" flex flex-row justify-between">
                  Room Name
                  <h5 className=" text-white">2,500.00</h5>
                </li>
              </ol>

              {/* Add-on Request */}
              <div className="mt-4">
                <p className="text-[#D5DFDA]">Add-on Request :</p>
                *แสดงrequestและราคา
                {/* {promotionCode === null ? (
                        <ol className="body1 text-[#D5DFDA]">
                <li className=" flex flex-row justify-between">
                  Airport Transfer
                  <h5 className=" text-white">500.00</h5>
                </li>
              </ol>
                      ) : null} */}
              </div>

              {/* Promotion Code */}
              <div className="mt-4">
                <p className="text-[#D5DFDA]">Promotion Code :</p>
                *แสดงcodeและราคา
                {/* {promotionCode === null ? (
                        <ol className="body1 text-[#D5DFDA]">
                <li className=" flex flex-row justify-between">
                  Airport Transfer
                  <h5 className=" text-white">500.00</h5>
                </li>
              </ol>
                      ) : null} */}
              </div>
            </div>
          </div>

          <div className="flex w-5/6 items-center justify-between py-6 ">
            <p className=" text-[#D5DFDA]">Total</p>
            <h5 className=" text-[#FFFFFF]">{values.totalPrice}</h5>
          </div>
        </div>
      </div>
      {/* Button */}
      <section className="mx-10 my-10 xl:mx-[351px]">
        <div className=" flex flex-row justify-center gap-10 ">
          <button
            className="visitlink"
            onClick={() => {
              router.push(`/user/${values.user_id}/booking_history/`);
            }}
          >
            Check Booking Detail
          </button>
          <PrimaryBtn
            btnName="Back to Home"
            handleClick={() => {
              router.push(`/`);
            }}
          ></PrimaryBtn>
        </div>
      </section>
    </>
  );
};

export default SubmitTotal;
