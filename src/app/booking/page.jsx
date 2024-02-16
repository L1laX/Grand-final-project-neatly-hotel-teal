"use client";
import { useState, useEffect } from "react";
import FormInformation from "@/components/common/FormInformation";
import FormSpecialReq from "@/components/common/FormSpecialReq";
import FormPayment from "@/components/common/FormPayment";

export default function StepperController() {
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    id_number: "",
    country: "",
  });
  const [request, setRequest] = useState({});
  console.log(request);
  const getRequest = (e) => {
    const { name, checked } = e.target;
    let value =
      name === "earlyCheckIn" ||
      name === "lateCheckOut" ||
      name === "nonSmokingRoom" ||
      name === "aRoomOnTheHighFloor" ||
      name === "aQuietRoom"
        ? 0
        : name === "extraPillows" || name === "phoneChargersAndAdapters"
          ? 100
          : name === "breakfast"
            ? 150
            : name === "airportTransfer"
              ? 200
              : name === "babyCot"
                ? 400
                : name === "extraBed"
                  ? 500
                  : null;
    if (checked) {
      const newRequest = { ...request, [name]: value };

      setRequest({ ...newRequest });
    } else {
      const newRequest = { ...request };
      delete newRequest[name];
      setRequest({ ...newRequest });
    }
  };
  console.log(values);
  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };
  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const getCountry = (value) => {
    setValues({ ...values, country: value });
  };
  const getdateOfBirth = (date) => {
    const value = new Date(date?.$d).toISOString();
    setValues({ ...values, dateOfBirth: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_number" && value.length > 13) return;
    if (name === "id_number")
      return setValues({ ...values, [name]: value.replace(/\D/g, "") });

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {}, []);

  return (
    <section className="booking-area mx-5 my-10 md:mx-40">
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
          {currentStep === 1 && (
            <FormInformation
              nextStep={nextStep}
              handleInputChange={handleInputChange}
              values={values}
              getCountry={getCountry}
              getdateOfBirth={getdateOfBirth}
            />
          )}
          {currentStep === 2 && (
            <FormSpecialReq
              nextStep={nextStep}
              prevStep={prevStep}
              handleInputChange={handleInputChange}
              getRequest={getRequest}
              values={values}
              request={request}
            />
          )}
          {currentStep === 3 && (
            <FormPayment
              prevStep={prevStep}
              handleInputChange={handleInputChange}
              values={values}
            />
          )}
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
