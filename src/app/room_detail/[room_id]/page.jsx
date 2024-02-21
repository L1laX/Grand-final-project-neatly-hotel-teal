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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    initialSlide: 0,
    dots: true,
  };

  return (
    <main className="flex w-full flex-col items-center ">
      <div className="w-full">
        <Slider {...settings}>
          {carouselImages.roomGallery?.length > 0 &&
            carouselImages.roomGallery.map((item, index) => (
              <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[40rem]">
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

      <div className="flex w-4/6 flex-col ">
        <h1 className="mt-4 text-[#2F3E35] ">{carouselImages.name}</h1>
        <div className="flex w-full justify-between ">
          <div className="flex h-36 w-full flex-col items-start justify-between text-[#646D89]">
            <div className="break-all">{carouselImages.description} </div>
            <div className="">
              {carouselImages.guests} person|{carouselImages.bedType}|
              {carouselImages.size} sqm
            </div>
          </div>
          <div className="flex w-full flex-col items-end justify-between">
            <div>
              <p className="text-right text-[#646D89] line-through">
                THB {carouselImages.pricePerNight}
              </p>
              <p className="text-right text-[#2A2E3F]">
                THB {carouselImages.promotionPrice}
              </p>
            </div>
            <div>
              <Link href="/booking/">
                <PrimaryBtn btnName="Book Now" />
                {/* edit link to new destination */}
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-10 w-full border-[1.75px]" />
        <h3 className=" text-[#000000]">Room Amenities</h3>
        <div className="flex-start flex w-full ">
          <div className="w-full ">
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
          <div className="w-full ">
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
      <h4 className="mt-10 text-center">Other Rooms</h4>
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
                  <h5 className="text-2xl font-bold text-white">Deluxe</h5>
                  <h6 className="text-base text-white">Explore Room</h6>
                </div>
              </CarouselItem>
              <CarouselItem className=" relative basis-1/3">
                <Image
                  className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                  src={BG}
                />
                <div className="absolute left-10 top-60 flex h-full w-full flex-col items-start ">
                  <h5 className="text-2xl font-bold text-white">Superior</h5>
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
