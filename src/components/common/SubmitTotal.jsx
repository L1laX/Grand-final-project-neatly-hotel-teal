import React from "react";
import { format, addDays, eachDayOfInterval } from "date-fns";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { useRouter } from "next/navigation";

const SubmitTotal = ({ values, request }) => {
  const router = useRouter();
  console.log(request);
  console.log(Object.keys(request));
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
                  <h5 className=" text-white">{values.roomName}</h5>
                  <h5 className=" text-white">2,500.00</h5>
                </li>
              </ol>

              {/* Add-on Request */}
              {Object.keys(request).length ? (
                <div className="mt-4">
                  <p className="font-bold  text-white">Add-on Request :</p>
                  <ol className="body1 mt-3 text-[#D5DFDA]">
                    {Object.values(request).map((item, index) => {
                      return (
                        <li className=" flex flex-row justify-between">
                          {Object.keys(request)[index]}
                          <h5 className=" text-white">{item}</h5>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ) : null}

              {/* Promotion Code */}
              {values.promotionCode ? (
                <div className="mt-4">
                  <p className="font-bold text-white">Promotion Code :</p>

                  <ol className="body1 text-[#D5DFDA]">
                    <li className=" flex flex-row justify-between">
                      {values.promotionCode}
                      <h5 className=" text-white">
                        {values.discount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </h5>
                    </li>
                  </ol>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex w-5/6 items-center justify-between py-6 ">
            <p className=" text-[#D5DFDA]">Total</p>
            <h5 className=" text-[#FFFFFF]">
              {values.totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h5>
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
