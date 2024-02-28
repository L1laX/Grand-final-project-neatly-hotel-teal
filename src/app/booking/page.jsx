"use client";
import { useState, useEffect } from "react";
import FormInformation from "@/components/common/FormInformation";
import FormSpecialReq from "@/components/common/FormSpecialReq";
import FormPayment from "@/components/common/FormPayment";
import axios from "axios";
import { format, addDays, eachDayOfInterval } from "date-fns";
import BookingIcon from "@/asset/icons/booking.svg";
import Image from "next/image";
import { HiOutlineBriefcase } from "react-icons/hi";

import SubmitTotal from "@/components/common/SubmitTotal";
export default function StepperController({ searchParams }) {
  // console.log(new Date(searchParams.from))
  // const datesInRange = eachDayOfInterval({ start: new Date(searchParams.from), end: new Date(searchParams.to) });
  const [ourPromotionCode, setOurPromotionCode] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState({
    dateOfBirth: "",
    email: "",
    id_number: "",
    country: "",
    payment_id: "",
    order_id: "",
    discount: 0,
    roomName: searchParams.roomName,
    roomReserve: searchParams.room,
    nightReserve:
      eachDayOfInterval({
        start: new Date(searchParams.from),
        end: new Date(searchParams.to),
      }).length - 1,
    checkInDate: new Date(new Date(searchParams.from).setUTCHours(0, 0, 0, 0)),
    checkOutDate: new Date(new Date(searchParams.to).setUTCHours(0, 0, 0, 0)),
    //roomReserve:searchParams.room,
    guestCount: searchParams.guest,
    allRoomId: searchParams.allRoomId,
    roomPrice: searchParams.roomPrice,
    user_id: searchParams.userId,
    //nightReserve:(eachDayOfInterval({ start: new Date(searchParams.from), end: new Date(searchParams.to) })).length-1,
    totalPrice:
      (eachDayOfInterval({
        start: new Date(searchParams.from),
        end: new Date(searchParams.to),
      }).length -
        1) *
      searchParams.roomPrice *
      searchParams.room,
  });
  const getUserData = async () => {
    const result = await axios.get(
      `/api/user/customer_booking/${searchParams.userId}?roomName=${searchParams.roomName}&allRoomId=${searchParams.allRoomId}`,
    );
    setValues({
      ...values,
      ...result?.data?.data,
      ...result?.data?.data?.userProfile,
    });
    setOurPromotionCode([...result.data.promotionCode]);
  };

  const [request, setRequest] = useState({});
  const [promotionCode, setPromotionCode] = useState("");
  const getRequest = (e) => {
    const { name, checked } = e.target;
    let value =
      name === "Early check-in" ||
      name === "Late check-out" ||
      name === "Non-smoking room" ||
      name === "A room on the high floor" ||
      name === "A quiet room"
        ? "free"
        : name === "Extra pilloes" || name === "Phone chargers and adapters"
          ? 100
          : name === "Breakfast"
            ? 150
            : name === "Airport transfer"
              ? 200
              : name === "Baby cot"
                ? 400
                : name === "Extra bed"
                  ? 500
                  : null;
    if (checked) {
      const newRequest = { ...request, [name]: value };

      setRequest({ ...newRequest });
      setValues({
        ...values,
        totalPrice:
          value !== "free" ? values.totalPrice + value : values.totalPrice,
      });
    } else {
      const newRequest = { ...request };
      delete newRequest[name];
      setRequest({ ...newRequest });
      setValues({
        ...values,
        totalPrice:
          value !== "free" ? values.totalPrice - value : values.totalPrice,
      });
    }
  };

  //console.log("testTTP", Object.values(request).reduce((acc, cur) => request[cur] !== "free" ? acc + cur : acc, 0));

  // const arrRequest = Object.keys(request).map((key) => ({
  //   [key]: request[key],
  // }));
  // console.log(arrRequest);

  // const totalAdditionalPrice = Object.keys(request).reduce((acc, cur) => {
  //   if (typeof request[cur] === "number") {
  //     acc += request[cur];
  //   }
  //   return acc;
  // }, 0);

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
    const value = new Date(date?.$d);
    setValues({ ...values, dateOfBirth: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_number" && value.length > 13) return;
    if (name === "id_number")
      return setValues({ ...values, [name]: value.replace(/\D/g, "") });

    setValues({ ...values, [name]: value });
  };

  // fetching room_id from search page : use customer_booking_id to get room_id
  // const getReserveRoom = async () => {
  //   try {
  //     const res = await axios.get(`/api/room_detail/${room_id}`);
  //     setValues(res.data);
  //     console.log(values);
  //   } catch (error) {
  //     console.log("Cannot fetching room_id", error);
  //   }
  // };
  // create customer_booking_id : POST /api/user/customer_booking
  const reservedRoom = async () => {
    try {
      // Check if all required fields are provided
      // if (!values.customerName) throw new Error("Customer name is required");
      // if (!values.email) throw new Error("Customer email is required");
      // if (!values.id_number) throw new Error("Customer ID number is required");
      // if (!values.country) throw new Error("Customer country is required");
      // if (!values.payment_id) throw new Error("Payment type is required");

      const bookingData = {
        customerName: values.name,
        customerEmail: values.email,
        customer_id_number: values.id_number,
        customerCountry: values.country,
        // customerDateOfBirth: values.dateOfBirth
        //   ? new Date(values.dateOfBirth).toISOString()
        //   : "1900-01-01T00:00:00.000Z",
        customerDateOfBirth: new Date(values.dateOfBirth),
        paymentType: values.payment_id,
        paymentStatus: values.paymentStatus || "Pending",

        user_id: values.user_id,
        checkInDate: new Date(values.checkInDate),
        checkOutDate: new Date(values.checkOutDate),
        totalPrice: values.totalPrice,
      };

      // Create customer booking in the database
      const response = await axios.post("/api/test1", bookingData);
      console.log("Customer booking created:", response.data);

      // Handle success
      alert("Booking successful");

      // Redirect or perform any other action as needed
    } catch (error) {
      console.error("Error reserving room:", error);
      // Handle error
      alert(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  console.log(values, "values");
  return (
    <>
      {currentStep !== 4 ? (
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
            <div className="md:w-full">
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
                  values={values}
                  setValues={setValues}
                  promotionCode={promotionCode}
                  setPromotionCode={setPromotionCode}
                  setCurrentStep={setCurrentStep}
                  request={request}
                  ourPromotionCode={ourPromotionCode}
                />
              )}
            </div>
            {/* Booking Result mapping from /api/room_detail/room_id*/}
            <div className=" flex flex-col md:w-1/2">
              <div className=" rounded bg-[#465c50]">
                <h5 className=" flex items-center gap-2 rounded rounded-b-none bg-[#2f3e35] p-4 text-white">
                  <HiOutlineBriefcase />
                  Booking Detail
                </h5>
                <div className="detail-box p-6 text-white">
                  <div className="mb-10 grid grid-flow-col grid-rows-2 gap-4">
                    <p>Check-in</p>
                    <p className="body1 text-white">After 2:00 PM</p>
                    <p>Check-Out</p>
                    <p className="body1 text-white">Before 12:00 PM</p>
                  </div>
                  <div className="checkin-checkout-date mb-10">
                    <p>
                      {format(values.checkInDate, "eee, dd MMM yyyy")} -{" "}
                      {format(values.checkOutDate, "eee, dd MMM yyyy")}
                    </p>

                    <p className="body1 text-white">
                      {values.guestCount} Guests | {values.roomReserve} Room |{" "}
                      {values.nightReserve} Nights
                    </p>
                  </div>

                  <div className="room-price mb-10">
                    <ol className="flex flex-row justify-between">
                      <li>{values.roomName}</li>
                      <li>{values.roomPrice}</li>
                    </ol>
                    {/* Add-on Request */}
                    {request
                      ? Object.keys(request).map((key) => (
                          <ol className="flex flex-row justify-between">
                            <li className="body1 text-[#D5DFDA]">{[key]}</li>
                            <li>{request[key]}</li>
                          </ol>
                        ))
                      : null}
                  </div>

                  {/* {
                arrRequest?.length?arrRequest.map((item,index)=>(
                  <p>{Object.keys(item)[0]} : {item[Object.keys(item)[0]]}</p>
                  //<p>{Object.keys(item)[0]} : {(Object.values(item))}</p>
                )):null
              } */}
                  <hr className=" text-[#D5DFDA]" />

                  <div className="total-price mt-6 flex flex-row justify-between">
                    <p className="body1 text-[#D5DFDA]">Total</p>
                    <h5 className="text-white">THB {values.totalPrice}</h5>
                  </div>
                </div>
              </div>

              {/* Notice detail don't change */}
              <div className="description-before-purchase mt-4 rounded bg-slate-300">
                <ol className="m-7 list-disc text-[#5d7b6a]">
                  <li>
                    Cancel booking will get full refund if the cancelation
                    occurs before 24 hours of the check-in date.
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
      ) : (
        <div>
          <SubmitTotal values={values} />
        </div>
      )}
    </>
  );
}
