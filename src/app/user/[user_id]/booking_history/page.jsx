"use client";
import Image from "next/legacy/image";
import SuperiorGardenView from "/src/asset/homepage/Superior-Garden-View.jpg";
import Superior from "/src/asset/homepage/Superior.jpg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";

const BookingHistory = ({params}) => {
  console.log("pppp",params)
  const {user_id} = params;
  console.log("params ",user_id )
  const [customerBooking, setCustomerBooking] = useState([]);

  const getBookingHistory = async () => {
    try {
      const res = await axios.get(`/api/test/${user_id}`);
      setCustomerBooking(res.data.data);
      console.log(res.data);
      //console.log(customerBooking);
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);
  return (
    <div className="flex justify-center">
      <h1>{customerBooking.id}</h1>
      <div className="flex w-11/12 max-w-[1980px] flex-col border-4 border-double border-indigo-600 lg:w-5/6">
        <h2 className="py-20 lg:text-7xl sm:text-5xl text-4xl">Booking History</h2>
        
        <div className="flex w-full flex-col border-4 border-double border-indigo-600 mb-10">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="relative flex h-[16rem] w-11/12 border-4 border-double border-indigo-600 md:h-[18rem] md:w-3/5 xl:w-2/5">
              <Image
                src={SuperiorGardenView}
                layout="fill"
                objectFit="cover"
                alt="Suite"
              />
            </div>
            <div className="flex w-full flex-col border-4 border-double border-indigo-600">
              <div className="flex w-full items-center justify-between border-4 border-double border-indigo-600 px-4 md:px-6 xl:px-14">
                <h3 className="pr-2 text-2xl lg:text-3xl xl:text-4xl">
                  Superior Garden View
                </h3>
                <p className="lg:text-md pl-2 md:text-sm xl:text-lg text-right">
                  Booking date: Tue, 16 Oct 2022
                </p>
              </div>
              <div className="lg:text-md flex w-full border-4 border-double border-indigo-600 px-4 py-5 text-sm max-md:justify-between md:px-6 md:py-10 xl:px-14 xl:text-lg">
                <div className="flex flex-col pr-3">
                  <p>checkin</p>
                  <p>Th, 19 Oct 2022 | After 2:00 PM</p>
                </div>
                <div className="flex flex-col pl-3">
                  <p>checkout</p>
                  <p>Fri, 20 Oct 2022 | Before 12:00 PM</p>
                </div>
              </div>
              <div className="mx-auto w-11/12 bg-[#F1F2F6]">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-14">
                      <span className="text-lg font-semibold lg:text-xl">
                        Booking Detail
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-lg">
                      <div className="xl:mx-14 lg:mx-8 mx-5 flex flex-col lg:text-lg text-sm">
                        <div className="my-5 flex justify-between">
                          <div>2 Guests (1 Night)</div>
                          <div className="max-sm:flex-col text-right">
                            <div className="inline pl-4">Payment success via</div>
                            <div className="ml-2 inline font-semibold">
                              Credit Card
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Superior Garden View Room</p>
                          <p className="font-semibold pl-4 text-right">2,500.00</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Map Add-on Request</p>
                          <p className="font-semibold pl-4 text-right">500.00</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Promotion Code</p>
                          <p className="font-semibold pl-4 text-right">-400.00</p>
                        </div>
                        <hr className="w-full border-[1.75px] mt-4" />
                        <div className="py-4 flex justify-between">
                          <p>Total</p>
                          <p className="text-xl font-semibold pl-4 text-right">THB 2,300.00</p>
                        </div>
                      </div>
                      <div className="mt-auto w-full bg-[#E4E6ED] xl:px-14 py-4 lg:px-8 px-5 lg:text-lg text-sm">
                        <p className="font-semibold">Additional Request</p>
                        <p>Can i have some chocolate?</p>
                      </div>
                      {/* แก้ pb-4 ใน accordion.jsx */}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center border-4 border-double border-indigo-600 mt-4 max-sm:flex-col">
            <p className="text-orange-500 py-3">cancel</p>
            <div className="flex items-center max-sm:flex-col">
              <div className="text-orange-500 sm:px-6 px-0 max-sm:pb-3">room detail</div>
              <div className="max-sm:pb-3">
              <PrimaryBtn
                btnName="Change Date"
                primaryButton=""
                // handleClick={handleClickSearch}
              />
              </div>
            </div>
          </div>
          <hr className="w-full border-[1.75px] mt-10" />
        </div>

        <div className="flex w-full flex-col mb-10">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="relative flex h-[16rem] w-11/12 md:h-[18rem] md:w-3/5 xl:w-2/5">
              <Image
                src={SuperiorGardenView}
                layout="fill"
                objectFit="cover"
                alt="Suite"
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center justify-between px-4 md:px-6 xl:px-14">
                <h3 className="pr-2 text-2xl lg:text-3xl xl:text-4xl">
                  Superior Garden View
                </h3>
                <p className="lg:text-md pl-2 md:text-sm xl:text-lg text-right">
                  Booking date: Tue, 16 Oct 2022
                </p>
              </div>
              <div className="lg:text-md flex w-full px-4 py-5 text-sm max-md:justify-between md:px-6 md:py-10 xl:px-14 xl:text-lg">
                <div className="flex flex-col pr-3">
                  <p>checkin</p>
                  <p>Th, 19 Oct 2022 | After 2:00 PM</p>
                </div>
                <div className="flex flex-col pl-3">
                  <p>checkout</p>
                  <p>Fri, 20 Oct 2022 | Before 12:00 PM</p>
                </div>
              </div>
              <div className="mx-auto w-11/12 bg-[#F1F2F6]">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-14">
                      <span className="text-lg font-semibold lg:text-xl">
                        Booking Detail
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-lg">
                      <div className="xl:mx-14 lg:mx-8 mx-5 flex flex-col lg:text-lg text-sm">
                        <div className="my-5 flex justify-between">
                          <div>2 Guests (1 Night)</div>
                          <div className="max-sm:flex-col text-right">
                            <div className="inline pl-4">Payment success via</div>
                            <div className="ml-2 inline font-semibold">
                              Credit Card
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Superior Garden View Room</p>
                          <p className="font-semibold pl-4 text-right">2,500.00</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Map Add-on Request</p>
                          <p className="font-semibold pl-4 text-right">500.00</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Promotion Code</p>
                          <p className="font-semibold pl-4 text-right">-400.00</p>
                        </div>
                        <hr className="w-full border-[1.75px] mt-4" />
                        <div className="py-4 flex justify-between">
                          <p>Total</p>
                          <p className="text-xl font-semibold pl-4 text-right">THB 2,300.00</p>
                        </div>
                      </div>
                      <div className="mt-auto w-full bg-[#E4E6ED] xl:px-14 py-4 lg:px-8 px-5 lg:text-lg text-sm">
                        <p className="font-semibold">Additional Request</p>
                        <p>Can i have some chocolate?</p>
                      </div>
                      {/* แก้ pb-4 ใน accordion.jsx */}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center mt-4 max-sm:flex-col">
            <p className="text-orange-500 py-3">cancel</p>
            <div className="flex items-center max-sm:flex-col">
              <div className="text-orange-500 sm:px-6 px-0 max-sm:pb-3">room detail</div>
              <div className="max-sm:pb-3">
              <PrimaryBtn
                btnName="Change Date"
                primaryButton=""
                // handleClick={handleClickSearch}
              />
              </div>
            </div>
          </div>
          <hr className="w-full border-[1.75px] mt-10" />
        </div>

        <div className="flex w-full flex-col mb-10">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="relative flex h-[16rem] w-11/12 md:h-[18rem] md:w-3/5 xl:w-2/5">
              <Image
                src={Superior}
                layout="fill"
                objectFit="cover"
                alt="Suite"
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center justify-between px-4 md:px-6 xl:px-14">
                <h3 className="pr-2 text-2xl lg:text-3xl xl:text-4xl">
                  Superior Garden View
                </h3>
                <p className="lg:text-md pl-2 md:text-sm xl:text-lg text-right">
                  Booking date: Tue, 16 Oct 2022
                </p>
              </div>
              <div className="lg:text-md flex w-full px-4 py-5 text-sm max-md:justify-between md:px-6 md:py-10 xl:px-14 xl:text-lg">
                <div className="flex flex-col pr-3">
                  <p>checkin</p>
                  <p>Th, 19 Oct 2022 | After 2:00 PM</p>
                </div>
                <div className="flex flex-col pl-3">
                  <p>checkout</p>
                  <p>Fri, 20 Oct 2022 | Before 12:00 PM</p>
                </div>
              </div>
              <div className="mx-auto w-11/12 bg-[#F1F2F6]">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-14">
                      <span className="text-lg font-semibold lg:text-xl">
                        Booking Detail
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-lg">
                      <div className="xl:mx-14 lg:mx-8 mx-5 flex flex-col lg:text-lg text-sm">
                        <div className="my-5 flex justify-between">
                          <div>2 Guests (1 Night)</div>
                          <div className="max-sm:flex-col text-right">
                            <div className="inline pl-4">Payment success via</div>
                            <div className="ml-2 inline font-semibold">
                              Credit Card
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Superior Garden View Room</p>
                          <p className="font-semibold pl-4 text-right">2,500.00</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Map Add-on Request</p>
                          <p className="font-semibold pl-4 text-right">500.00</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p>Promotion Code</p>
                          <p className="font-semibold pl-4 text-right">-400.00</p>
                        </div>
                        <hr className="w-full border-[1.75px] mt-4" />
                        <div className="py-4 flex justify-between">
                          <p>Total</p>
                          <p className="text-xl font-semibold pl-4 text-right">THB 2,300.00</p>
                        </div>
                      </div>
                      <div className="mt-auto w-full bg-[#E4E6ED] xl:px-14 py-4 lg:px-8 px-5 lg:text-lg text-sm">
                        <p className="font-semibold">Additional Request</p>
                        <p>Can i have some chocolate?</p>
                      </div>
                      {/* แก้ pb-4 ใน accordion.jsx */}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center mt-4 max-sm:flex-col">
            <p className="text-orange-500 py-3">cancel</p>
            <div className="flex items-center max-sm:flex-col">
              <div className="text-orange-500 sm:px-6 px-0 max-sm:pb-3">room detail</div>
              <div className="max-sm:pb-3">
              <PrimaryBtn
                btnName="Change Date"
                primaryButton=""
                // handleClick={handleClickSearch}
              />
              </div>
            </div>
          </div>
          <hr className="w-full border-[1.75px] mt-10" />
        </div>


      </div>
    </div>
  );
};

export default BookingHistory;
