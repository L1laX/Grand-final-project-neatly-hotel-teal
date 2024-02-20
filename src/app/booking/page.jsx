"use client";
import { useState, useEffect } from "react";
import FormInformation from "@/components/common/FormInformation";
import FormSpecialReq from "@/components/common/FormSpecialReq";
import FormPayment from "@/components/common/FormPayment";
import axios from "axios";
import { format, addDays, eachDayOfInterval } from "date-fns";

export default function StepperController({ searchParams }) {


  const testtest = {
    nameOfRoom:searchParams.roomName,
    checkinDate:searchParams.from,
    checkOutDate:searchParams.to,
    roomReserve:searchParams.room,
    guestReserve:searchParams.guest,
    allRoomId:searchParams.allRoomId,
    roomPrice:searchParams.roomPrice,
    userId:searchParams.userId,
    nightReserve:(eachDayOfInterval({ start: new Date(searchParams.from), end: new Date(searchParams.to) })).length-1,
    totalRoomPrice:((eachDayOfInterval({ start: new Date(searchParams.from), end: new Date(searchParams.to) })).length-1)*searchParams.roomPrice*searchParams.room
  }
  // console.log(new Date(searchParams.from))
  // const datesInRange = eachDayOfInterval({ start: new Date(searchParams.from), end: new Date(searchParams.to) });

  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    id_number: "",
    country: "",
    payment_id: "",
    order_id: "",
  });

  const getUserData =async()=>{
    const result = await axios.get(`/api/user/customer_booking/${searchParams.userId}`)
    setValues(result.data.data)
    console.log(result)
  }

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
    } else {
      const newRequest = { ...request };
      delete newRequest[name];
      setRequest({ ...newRequest });
    }
  };
  console.log(values);

  // const arrRequest = Object.keys(request).map((key) => ({
  //   [key]: request[key],
  // }));
  // console.log(arrRequest);

  const totalAdditionalPrice = Object.keys(request).reduce((acc,cur) => {
    if(typeof request[cur] === "number"){
      acc += request[cur]
    }
    return acc
  },0)

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
      const res = await axios.post("/api/user/customer_booking");
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData()
    // getReserveRoom();
  }, []);

  return (
    <section className="booking-area mx-5 my-10 md:mx-40">
      <div>
        <h1>ขอเทสครับ</h1>
        <p>ชื่อห้อง: {testtest.nameOfRoom}</p>
        <p>ห้องที่จะจอง: {testtest.roomReserve}</p>
        <p>แขกที่จะเข้าพัก: {testtest.guestReserve}</p>
        <p>วันที่จะเข้าพัก: {testtest.checkinDate}</p>
        <p>วันที่จะออก: {testtest.checkOutDate}</p>
        <p>id ห้อง: {testtest.allRoomId}</p>
        <p>ราคาตต่อคืน: {testtest.roomPrice}</p>
        <p>จำนวนคืน: {testtest.nightReserve}</p>
        <p>userId: {testtest.userId}</p>
        <p>จอง {testtest.roomReserve} ห้อง, {testtest.nightReserve} คืน รวมราคา: {testtest.totalRoomPrice}</p>

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
        <div className=" border-2 border-red-500 md:w-full">
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
            />
          )}
        </div>

        {/* Booking Result mapping from /api/room_detail/room_id*/}
        <div className=" flex flex-col md:w-1/2">
          <div className=" rounded bg-[#5d7b6a]">
            <h5 className=" rounded rounded-b-none bg-[#2f3e35] p-4 text-white">
              Booking Detail
            </h5>
            <div className=" p-6 text-white">
              <p>Total 2500 THB</p>
              <p>Check-in: {testtest.checkinDate}</p>
              <p>Check-Out: {testtest.checkOutDate}</p>
              <p>แขกที่จะเข้าพัก: {testtest.guestReserve}</p>
              <p>ชื่อห้อง: {testtest.nameOfRoom}</p>
              <p>ราคาตต่อคืน: {testtest.roomPrice}</p>
              {/* {
                arrRequest?.length?arrRequest.map((item,index)=>(
                  <p>{Object.keys(item)[0]} : {item[Object.keys(item)[0]]}</p>
                  //<p>{Object.keys(item)[0]} : {(Object.values(item))}</p>
                )):null
              } */}

              {
                request? Object.keys(request).map((key) => (
                  <p>{[key]}: {request[key]}</p>
                )):null
              }

              <p>จอง {testtest.roomReserve} ห้อง, {testtest.nightReserve} คืน รวมราคา: {testtest.totalRoomPrice}</p>
              <p>total:{testtest.totalRoomPrice+totalAdditionalPrice}</p>

            </div>
          </div>
          {/* ไม่มีการเปลี่ยนแปลงข้อมูล */}
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
      <button>Reserve</button>
    </section>
  );
}
