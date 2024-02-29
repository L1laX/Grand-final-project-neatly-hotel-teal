"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Image from "next/image";
import CloseIcon from "@/asset/icons/close-outline.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSession } from "next-auth/react";

export const RoomCard = ({
  roomItem,
  roomName,
  roomImage,
  roomGuests,
  roomDesc,
  roomPrice,
  roomDisc,
  roomBedType,
  roomSize,
  roomAvailable,
  dateRoomGuest,
  allRoomId,
  roomPromotionPrice,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const getRoomname = (name) => {
    switch (name) {
      case "singleBed":
        return "Single Bed";
      case "doubleBed":
        return "Double Bed";
      case "doubleBed(kingSize)":
        return "Double Bed (King Size)";
      case "twinBed":
        return "Twin Bed";
      default:
        return name;
    }
  };
  const handleBooking = () => {
    const price = roomPromotionPrice ? roomPromotionPrice : roomPrice;
    const queryString = new URLSearchParams(dateRoomGuest).toString();
    const path = "/booking";
    allRoomId = allRoomId.slice(0, dateRoomGuest.room);
    const url =
      String(path) +
      "?" +
      queryString +
      "&roomName=" +
      roomName +
      "&allRoomId=" +
      allRoomId +
      "&userId=" +
      session?.user?.id +
      "&roomPrice=" +
      price;
    router.push(url);
  };
  return (
    <div>
      <div className={roomItem}>
        <div className="room-card flex flex-col justify-center gap-12 px-5 py-10 lg:flex-row">
          {/* Image and Image Popup */}
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="cursor-pointer rounded-md bg-slate-200">
                <img
                  src={roomImage}
                  className="h-[320px] w-[453px] rounded-md object-cover"
                  alt="roomImage"
                />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="h-3/4 w-2/3">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <div className="flex h-14 flex-row justify-between p-4 md:mx-4">
                    <h5>{roomName}</h5>
                    <AlertDialogCancel>
                      <Image
                        className="cursor-pointer"
                        src={CloseIcon}
                        width={20}
                        height={20}
                      />
                    </AlertDialogCancel>
                  </div>
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <div className="content mt-5 h-full w-full p-4">
                  <img src={roomImage} alt="room" />
                </div>
              </AlertDialogDescription>
            </AlertDialogContent>
          </AlertDialog>

          {/* Room Detail */}
          <section className="room-detail flex flex-col lg:justify-between">
            <div className=" flex flex-row justify-between md:w-[577px]">
              <div className="right-content w-1/2 pt-4">
                <h4
                  className="cursor-pointer"
                  onClick={() => router.push(`/room_detail/${roomItem}`)}
                >
                  {roomName}
                </h4>
                <p className="body1 text-[#646D89]">
                  {roomGuests} Guests | {getRoomname(roomBedType)} | {roomSize}{" "}
                  sqm
                </p>
                <p className="body1 mt-8 text-[#646D89]">
                  {roomDesc.slice(0, 150)} Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Reiciendis earum eum aliquid
                  blanditiis amet velit, sapiente soluta fuga odio et repellat
                  molestiae illum.
                </p>
                <p className="body2 mt-4 text-[#c8ccd8]">
                  Available Room :{" "}
                  <span className="cursor-default text-lg text-orange-500 hover:text-orange-300">
                    {" "}
                    {roomAvailable}
                  </span>
                </p>
              </div>

              <div className="left-content flex flex-col pl-6 pt-4 lg:items-end ">
                {roomPromotionPrice ? (
                  <div className=" flex flex-col items-end">
                    <p className="text-left font-sans text-base font-normal text-[#646D89] line-through">
                      THB{" "}
                      {roomPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <h5>
                      THB{" "}
                      {roomPromotionPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </h5>
                    <p className="mt-6 font-sans text-base font-normal text-[#646D89] lg:text-right ">
                      Per Night <br /> (Including Taxes & Fees)
                    </p>
                  </div>
                ) : (
                  <div className=" mb-5 flex flex-col items-end">
                    <h5>
                      THB{" "}
                      {roomPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </h5>
                    <p className="mt-6 font-sans text-base font-normal text-[#646D89] lg:text-right">
                      Per Night <br /> (Including Taxes & Fees)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Popup Room Detial */}
            <div className="flex cursor-pointer items-center justify-center gap-5 pt-5 lg:items-center lg:justify-end">
              <AlertDialog>
                <AlertDialogTrigger>
                  <p className="visitlink">Room Detail</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className=" flex flex-row justify-between gap-5 p-4 md:ml-20">
                        <h5>Superior Garden View</h5>

                        <AlertDialogCancel>
                          <Image
                            className="cursor-pointer"
                            src={CloseIcon}
                            width={20}
                            height={20}
                          />
                        </AlertDialogCancel>
                      </div>
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    <div className="content mt-5 p-4 md:mx-20">
                      <div className="px-5 md:px-0">
                        <Carousel>
                          <CarouselContent>
                            <CarouselItem className="basis-2/3">
                              <img src={roomImage} alt="room" />
                            </CarouselItem>
                            <CarouselItem className="basis-2/3">
                              <img src={roomImage} alt="room" />
                            </CarouselItem>
                            <CarouselItem className="basis-2/3">
                              <img src={roomImage} alt="room" />
                            </CarouselItem>
                            <CarouselItem className="basis-2/3">
                              <img src={roomImage} alt="room" />
                            </CarouselItem>
                          </CarouselContent>
                          <CarouselNext />
                          <CarouselPrevious />
                        </Carousel>
                      </div>
                      <div className="content-detail divide-y-2 divide-gray-300 p-4">
                        <div className="py-5">
                          <p className="font-sans text-base font-normal text-[#646D89]">
                            {roomGuests} Guests | {roomBedType} | {roomSize}
                          </p>
                          <p className="font-sans text-base font-normal text-[#646D89]">
                            {roomDesc}
                          </p>
                        </div>
                        {/* Room Amenities */}
                        <div className="py-5">
                          <h5 className="text-black">Room Amenities</h5>
                          <div className="flex flex-col justify-between gap-6 p-4 md:flex-row">
                            <ul className="amenities-1 list-disc">
                              <li className="bullet-text">Safe in Room</li>
                              <li className="bullet-text">Air Conditioning</li>
                              <li className="bullet-text">
                                High-speed internet connection
                              </li>
                              <li className="bullet-text">Hairdryer</li>
                              <li className="bullet-text">Shower</li>
                              <li className="bullet-text">
                                Bathroom amenities
                              </li>
                              <li className="bullet-text">Lamp</li>
                            </ul>
                            <ul className="amenities-2 list-disc">
                              <li className="bullet-text">Minibar</li>
                              <li className="bullet-text">Telephone</li>
                              <li className="bullet-text">Ironing board</li>
                              <li className="bullet-text">
                                A floor only accessible via a guest room key
                              </li>
                              <li className="bullet-text">Alarm clock</li>
                              <li className="bullet-text">Bathrobe</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogContent>
              </AlertDialog>
              {/* Booking Button */}
              <PrimaryBtn btnName="Book Now" handleClick={handleBooking} />
            </div>
          </section>
          <hr />
        </div>
      </div>
    </div>
  );
};
