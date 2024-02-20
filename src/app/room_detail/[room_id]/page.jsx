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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./react-slick.css";

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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    initialSlide: 0,
    dots: true,
  };

  return (
    <main className="flex w-full flex-col items-center border-4 border-double border-indigo-600">
      <div className="w-full">
        <Slider {...settings}>
          {carouselImages.roomGallery?.length > 0 &&
            carouselImages.roomGallery.map((item, index) => (
              <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[60rem]">
                <Image
                  className="cursor-grab active:cursor-grabbing"
                  layout="fill"
                  objectFit="cover"
                  src={item.image}
                  alt="Suite"
                  unoptimized
                />
              </div>
            ))}
        </Slider>
      </div>

      <div className="flex w-4/6 flex-col border-4 border-indigo-600">
        <h1 className="mt-4 border-4 border-double border-indigo-600">
          Superior Garden View
        </h1>
        <div className="flex w-full justify-between border-4 border-indigo-600">
          <div className="flex h-36 w-full flex-col items-start justify-between">
            <div className="break-all">
              kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.
            </div>
            <div className="">2 person|1kipoki|sdpkio</div>
          </div>
          <div className="flex w-full flex-col items-end justify-between">
            <div>
              <p className="text-right line-through">3000</p>
              <p className="text-right">3000</p>
            </div>
            <div>
              <PrimaryBtn btnName="Book Now" />
            </div>
          </div>
        </div>
        
        <hr className="w-full my-10 border-[1.75px]" />
        <h3>Room Amenities</h3>
        <div className="flex-start flex w-full border-4 border-double border-indigo-600">
          <div className="w-full border-4 border-indigo-600">
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
            </ul>
          </div>
          <div className="w-full border-4 border-indigo-600">
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
          </ul>
          </div>
         
        </div>
      </div>
      <h4 className="text-center mt-10">Other Rooms</h4>
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
                        <h6 className="text-base  text-white">Explore Room</h6>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselNext />
                  <CarouselPrevious />
                </Carousel>
              </div>
            </div>

    </main>
  );
}
