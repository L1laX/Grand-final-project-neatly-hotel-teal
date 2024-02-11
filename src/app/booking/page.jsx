"use client";
import { useState } from "react";
import FormInformation from "@/components/common/FormInformation";
import FormSpecialReq from "@/components/common/FormSpecialReq";
import FormPayment from "@/components/common/FormPayment";
import PrimaryBtn from "@/components/common/PrimaryBtn";

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };
  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <section className="booking-area mx-5 my-10 animate-jump-in border-2 border-red-500 animate-delay-300 animate-once md:mx-40">
      <div>
        <h1 className="">Booking Room</h1>
        {/* Step indicators */}
        <div className="step-indicators my-10 flex flex-col gap-10 md:flex-row">
          {currentStep === 1 ? (
            <div className="step-1 flex flex-row items-center gap-4">
              <div className="step-active flex h-16 w-16 items-center justify-center rounded-md bg-[#e76b39] text-4xl text-white">
                1
              </div>
              <h5 className=" text-[#e76b39]">Basic Information</h5>
            </div>
          ) : (
            <div className="step-2 flex flex-row items-center gap-4">
              <div className="step-none flex h-16 w-16 items-center justify-center rounded-md bg-[#f1f2f6] text-4xl text-[#9aa1b9]">
                1
              </div>
              <h5 className=" text-[#9aa1b9]">Basic Information</h5>
            </div>
          )}
          {currentStep === 2 ? (
            <div className="step-1 flex flex-row items-center gap-4">
              <div className="step-active flex h-16 w-16 items-center justify-center rounded-md bg-[#e76b39] text-4xl text-white">
                2
              </div>
              <h5 className=" text-[#e76b39]">Special Request</h5>
            </div>
          ) : (
            <div className="step-2 flex flex-row items-center gap-4">
              <div className="step-none flex h-16 w-16 items-center justify-center rounded-md bg-[#f1f2f6] text-4xl text-[#9aa1b9]">
                2
              </div>
              <h5 className=" text-[#9aa1b9]">Special Request</h5>
            </div>
          )}
          {currentStep === 3 ? (
            <div className="step-1 flex flex-row items-center gap-4">
              <div className="step-active flex h-16 w-16 items-center justify-center rounded-md bg-[#e76b39] text-4xl text-white">
                3
              </div>
              <h5 className=" text-[#e76b39]">Payment Method</h5>
            </div>
          ) : (
            <div className="step-2 flex flex-row items-center gap-4">
              <div className="step-none flex h-16 w-16 items-center justify-center rounded-md bg-[#f1f2f6] text-4xl text-[#9aa1b9]">
                3
              </div>
              <h5 className=" text-[#9aa1b9]">Payment Method</h5>
            </div>
          )}
        </div>
        <hr className=" my-10" />
      </div>
      {/* Conditional rendering Form Stepper */}
      <div className="flex flex-col justify-between md:flex-row">
        {/* Form Information*/}
        <div className=" md:w-full">
          {currentStep === 1 && <FormInformation nextStep={nextStep} />}
          {currentStep === 2 && (
            <FormSpecialReq nextStep={nextStep} prevStep={prevStep} />
          )}
          {currentStep === 3 && <FormPayment prevStep={prevStep} />}
        </div>

        {/* Booking Result mapping from /api/room_detail/room_id*/}
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
