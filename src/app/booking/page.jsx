"use client";
import { useState, useEffect } from "react";
import FormInformation from "@/components/common/FormInformation";
import FormSpecialReq from "@/components/common/FormSpecialReq";
import FormPayment from "@/components/common/FormPayment";
import axios from "axios";
import { format, addDays, eachDayOfInterval } from "date-fns";

export default function StepperController({ searchParams }) {
  const testtest = {
    nameOfRoom: searchParams.roomName,
    checkinDate: format(
      new Date(searchParams.from).setUTCHours(0, 0, 0, 0),
      "eee',' dd MMM yyyy",
    ),
    checkOutDate: format(
      new Date(searchParams.to).setUTCHours(0, 0, 0, 0),
      "eee',' dd MMM yyyy",
    ),
    roomReserve: searchParams.room,
    guestReserve: searchParams.guest,
    allRoomId: searchParams.allRoomId,
    roomPrice: searchParams.roomPrice,
    userId: searchParams.userId,
    nightReserve:
      eachDayOfInterval({
        start: new Date(searchParams.from),
        end: new Date(searchParams.to),
      }).length - 1,
    totalRoomPrice:
      (eachDayOfInterval({
        start: new Date(searchParams.from),
        end: new Date(searchParams.to),
      }).length -
        1) *
      searchParams.roomPrice *
      searchParams.room,
  };
  // console.log(new Date(searchParams.from))
  // const datesInRange = eachDayOfInterval({ start: new Date(searchParams.from), end: new Date(searchParams.to) });

  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState({
    dateOfBirth: "",
    email: "",
    id_number: "",
    country: "",
    payment_id: "",
    order_id: "",
    roomName: searchParams.roomName,
    checkinDate: new Date(searchParams.from).setUTCHours(0, 0, 0, 0),
    checkOutDate: new Date(searchParams.to).setUTCHours(0, 0, 0, 0),
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


  console.log(values,"value");


  const getUserData = async () => {
    const result = await axios.get(
      `/api/user/customer_booking/${searchParams.userId}?roomName=${searchParams.roomName}`,
    );
    //setValues({...values,...result?.data?.data,...result?.data?.data?.userProfile})
    setValues({ ...values, ...result?.data?.data });
    console.log(result);
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
  console.log(request);

  //console.log("testTTP", Object.values(request).reduce((acc, cur) => request[cur] !== "free" ? acc + cur : acc, 0));

  // const arrRequest = Object.keys(request).map((key) => ({
  //   [key]: request[key],
  // }));
  // console.log(arrRequest);

  const totalAdditionalPrice = Object.keys(request).reduce((acc, cur) => {
    if (typeof request[cur] === "number") {
      acc += request[cur];
    }
    return acc;
  }, 0);

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
      // Check if all required fields are provided
      // if (!values.customerName) throw new Error("Customer name is required");
      // if (!values.email) throw new Error("Customer email is required");
      // if (!values.id_number) throw new Error("Customer ID number is required");
      // if (!values.country) throw new Error("Customer country is required");
      // if (!values.payment_id) throw new Error("Payment type is required");

      const bookingData = {
        customerName: values.name,
        customerEmail: values.email,
        customer_id_number: values?.userProfile?.id_number,
        customerCountry: values?.userProfile?.country,
        // customerDateOfBirth: values.dateOfBirth
        //   ? new Date(values.dateOfBirth).toISOString()
        //   : "1900-01-01T00:00:00.000Z",

        customerDateOfBirth: new Date(values?.dateOfBirth),
        paymentType: values.payment_id,
        paymentStatus: values.paymentStatus || "Pending",
        user_id:values.user_id,
        checkInDate:new Date(new Date(values.checkinDate).toISOString()),
        checkOutDate:new Date(new Date(values.checkOutDate).toISOString()),
        totalPrice:values.totalPrice

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
        <p>
          จอง {testtest.roomReserve} ห้อง, {testtest.nightReserve} คืน รวมราคา:{" "}
          {testtest.totalRoomPrice}
        </p>

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
              <p>Check-in: {format(values.checkinDate, "eee, dd MMM yyyy")}</p>
              <p>
                Check-Out: {format(values.checkOutDate, "eee, dd MMM yyyy")}
              </p>
              <p>แขกที่จะเข้าพัก: {values.guestCount}</p>
              <p>ชื่อห้อง: {values.roomName}</p>
              <p>ราคาตต่อคืน: {values.roomPrice}</p>
              {/* {
                arrRequest?.length?arrRequest.map((item,index)=>(
                  <p>{Object.keys(item)[0]} : {item[Object.keys(item)[0]]}</p>
                  //<p>{Object.keys(item)[0]} : {(Object.values(item))}</p>
                )):null
              } */}

              {request
                ? Object.keys(request).map((key) => (
                    <p>
                      {[key]}: {request[key]}
                    </p>
                  ))
                : null}

              <p>
                จอง {testtest.roomReserve} ห้อง, {testtest.nightReserve} คืน
                รวมราคา: {values.totalPrice}
              </p>
              <p>total:{values.totalPrice}</p>
              <button
                className="mt-4 w-full rounded-md bg-[#e76b39] p-2 text-white hover:bg-[#f1f2f6] hover:text-[#e76b39]"
                onClick={reservedRoom}
              >
                Booking
              </button>
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
    </section>
  );
}
