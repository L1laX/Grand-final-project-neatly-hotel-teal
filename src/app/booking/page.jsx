"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/DatePicker";
import Country from "@/components/common/Country";
import PrimaryBtn from "@/components/common/PrimaryBtn";

export default function Booking() {
  const [bookingRoom, setBookingRoom] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingRoom((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <section className="booking-area mx-5 my-10 animate-jump-in border-2 border-red-500 animate-delay-300 animate-once md:mx-40">
      {/* Stepper 1-2-3 */}
      <div>
        <h1 className="">Booking Room</h1>
        <div className="stepper-box my-10 flex flex-col gap-10 md:flex-row">
          <div className="step-1 flex flex-row items-center gap-4">
            <div className="step-active flex h-16 w-16 items-center justify-center rounded-md bg-[#e76b39] text-4xl text-white">
              1
            </div>
            <h5 className=" text-[#e76b39]">Basic Information</h5>
          </div>
          <div className="step-2 flex flex-row items-center gap-4">
            <div className="step-none flex h-16 w-16 items-center justify-center rounded-md bg-[#f1f2f6] text-4xl text-[#9aa1b9]">
              2
            </div>
            <h5 className=" text-[#9aa1b9]">Special Request</h5>
          </div>
          <div className="step-3 flex flex-row items-center gap-4">
            <div className="step-none flex h-16 w-16 items-center justify-center rounded-md bg-[#f1f2f6] text-4xl text-[#9aa1b9]">
              3
            </div>
            <h5 className=" text-[#9aa1b9]">Payment Method</h5>
          </div>
        </div>
        <hr className=" my-10" />
      </div>
      <div className="flex flex-col justify-between md:flex-row">
        {/* Form */}
        <form action="" className="mr-6 rounded bg-white p-10 md:w-full">
          <h5 className="mb-10 text-[#9AA1B9]">Basic Information</h5>

          <div className="fullname-container grid grid-cols-1 pb-10">
            <label htmlFor="fullname">
              Fullname
              <Input
                className="grid outline-none"
                type="text"
                name="fullName"
                onChange={handleChange}
                value=""
                placeholder="fullname"
              />
            </label>
          </div>
          <div className=" email-container pb-10">
            <label htmlFor="email">
              Email
              <Input
                className="grid outline-none"
                type="email"
                name="email"
                onChange={handleChange}
                value=""
                placeholder="email"
              />
            </label>
          </div>
          <div className=" id_number-container pb-10">
            <label htmlFor="id_number">
              ID Number
              <Input
                className="grid outline-none"
                type="text"
                name="id_number"
                onChange={handleChange}
                value=""
                placeholder="id_number"
              />
            </label>
          </div>
          <div className="dateOfBirth-container grid gap-4 pb-10">
            <label htmlFor="dateOfBirth">
              Date of Birth
              <DatePicker selected={bookingRoom} onSelect={handleChange} />
            </label>
          </div>
          <div className="country-container pb-10">
            <label htmlFor="Country">
              Country
              <Country setCountry={handleChange} />
            </label>
          </div>

          {/* Button */}
          <div className=" flex flex-row justify-between">
            <button className="visitlink">Back</button>{" "}
            <PrimaryBtn btnName="Next" handleClick={handleChange}></PrimaryBtn>
          </div>
        </form>
        {/* Booking Result */}
        <div className=" flex flex-col md:w-1/2">
          <div className=" rounded bg-[#5d7b6a]">
            <h5 className="rounded rounded-b-none bg-[#2f3e35] p-4 text-white">
              Booking Detail
            </h5>
            <div className=" p-6 text-white">
              <p>Total 2500 THB</p>
            </div>
          </div>
          <div className="description-before-purchase mt-4 rounded bg-slate-300">
            <ol className="m-7 list-disc text-[#5d7b6a]">
              <li>
                Cancel booking will get full refund if the cancelation occurs
                before 24 hours of the check-in date.
              </li>
              <li>
                Able to change check-in or check-out date booking within 24
                hours of the booking date
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
