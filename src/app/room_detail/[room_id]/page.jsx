//// edit it
"use client";
import { useState, useEffect } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/legacy/image";
import BG from "@/asset/background/login-page/bg.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import axios from "axios";
import { Room } from "@mui/icons-material";
import { useRouter } from "next/navigation";

//add1
// const prisma = new PrismaClient();

export default function RoomDetailById({ params: { room_id } }) {
  // add2 usestate
  const [carouselImages, setCarouselImages] = useState([]);

  const fetchCarouselImages = async () => {
    try {
      const images = await axios.get(`/api/room_detail/${room_id}`); // Fetch images from Prisma
      setCarouselImages(images.data.data);
      console.log(images.data.data);
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  return (
    <main>
      <div className=" content-page sm: lg: xl: flex flex-col items-center gap-5 ">
        {/* <p className=" slide-room flex justify-center rounded border-2 border-white bg-gray-600">
          Room Detail By Id No.{params.room_id}
        </p> */}

        <div className="slide-top m-20  ">
          <Carousel>
            <CarouselContent>
              {carouselImages.roomGallery?.length > 0 &&
                carouselImages.roomGallery.map((item, index) => (
                  <CarouselItem className="basis-1/3" key={index}>
                    <Image
                      className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                      src={item.image}
                      alt="sample image"
                      unoptimized
                      width={1000}
                      height={1000}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>

        <div className="under-slide justify-c flex w-3/5 items-center  ">
          <div className="center-box  flex flex-col   ">
            <div className="box-2 flex flex-col gap-10 ">
              <p className=" room-name   text-xl text-green-800 md:text-xl lg:text-6xl ">
                {carouselImages.name}
              </p>
              <div className="box2-2 flex flex-row  gap-10 ">
                <div className="2-2left  flex flex-col  ">
                  <p className=" text-base  text-gray-700">
                    {carouselImages.description}
                  </p>
                  <div className="book-detail flex flex-row text-sm ">
                    <p className=" gap-1 text-gray-700">
                      {carouselImages.guests} person
                    </p>
                    |
                    <p className="  text-gray-700"> {carouselImages.bedType}</p>
                    |
                    <p className="  gap-1 text-gray-700 ">
                      {carouselImages.size}sqm
                    </p>
                  </div>
                </div>
                <div className="2-2right flex flex-col gap-3 ">
                  <div className=" flex flex-col gap-1 ">
                    <p className="before-discount  text-gray-700 line-through">
                      {carouselImages.pricePerNight}
                    </p>
                    <p>{carouselImages.promotionPrice}</p>
                  </div>
                  <Link href="/booking/">
                    <PrimaryBtn btnName="Book Now" />
                    {/* edit link to new destination */}
                  </Link>
                </div>
              </div>
              <div className=" py-5">
                <p className=" font-bold">Room Amenities</p>
                <div className="flex flex-col justify-between gap-6 p-4 md:flex-row">
                  <ul className="amenities-1 list-disc ">
                    {carouselImages?.roomAmenity?.length &&
                      carouselImages?.roomAmenity?.map((item, index, arr) => {
                        if (index < arr.length / 2) {
                          return (
                            <li key={index} className="bullet-text">
                              {item.name}
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}

                    {/* <li className="bullet-text">Air Conditioning</li>
<li className="bullet-text">
High speed internet connection
</li>
<li className="bullet-text">Hairdryer</li>
<li className="bullet-text">Shower</li>
<li className="bullet-text">Bathroom amenities</li>
<li className="bullet-text">Lamp</li> */}
                  </ul>
                  <ul className="amenities-2 list-disc">
                    {carouselImages?.roomAmenity?.length &&
                      carouselImages?.roomAmenity?.map((item, index, arr) => {
                        if (index >= arr.length / 2) {
                          return (
                            <li key={index} className="bullet-text">
                              {item.name}
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    {/* <li className="bullet-text">Minibar</li>
<li className="bullet-text">Telephone</li>
<li className="bullet-text">Ironing board</li>
<li className="bullet-text">
A floor only accessible via a guest room key
</li>
<li className="bullet-text">Alarm clock</li>
<li className="bullet-text">Bathrobe</li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="box3 flex flex-col gap-5">
              <p className="   flex justify-center  text-xl font-bold ">
                Other Rooms
              </p>
              {/* //add test below */}

              <div className="random-room flex justify-center">
                <div className="slide-random m-20 flex items-center justify-center">
                  <div className="  bg-slate-500">
                    <Carousel>
                      <CarouselContent>
                        {carouselImages.roomGallery?.length > 0 &&
                          carouselImages.roomGallery.map((item, index) => (
                            <CarouselItem className="basis-1/3" key={index}>
                              <Image
                                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                                src={item.image}
                                alt="sample image"
                                unoptimized
                                width={1000}
                                height={1000}
                              />
                            </CarouselItem>
                          ))}
                      </CarouselContent>
                      <CarouselNext />
                      <CarouselPrevious />
                    </Carousel>
                  </div>
                </div>
              </div>

              {/* //above is testing */}
              {/* //below is lasted code */}
              <div className="random-room  flex justify-center  ">
                <div className="slide-randon m-20 flex items-center justify-center">
                  <Carousel>
                    <CarouselContent className="flex items-center justify-center">
                      <CarouselItem className="  relative basis-1/3">
                        <Image
                          className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                          src={BG}
                        />
                        <div className="absolute left-10 top-60 flex h-full w-full flex-col items-start ">
                          <h5 className="text-2xl font-bold text-white">
                            Deluxe
                          </h5>
                          <h6 className="text-base text-white">Explore Room</h6>
                        </div>
                      </CarouselItem>
                      <CarouselItem className=" relative basis-1/3">
                        <Image
                          className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                          src={BG}
                        />
                        <div className="absolute left-10 top-60 flex h-full w-full flex-col items-start ">
                          <h5 className="text-2xl font-bold text-white">
                            Superior
                          </h5>
                          <h6 className="text-base  text-white">
                            Explore Room
                          </h6>
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                  </Carousel>
                </div>
              </div>
              {/* //end of lasted code for random slide */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
