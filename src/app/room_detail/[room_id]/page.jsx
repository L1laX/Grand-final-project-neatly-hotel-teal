//// edit it
"use client";
import { useState, useEffect } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import LoadingPage from "@/components/common/LoadingPage";
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
import { set } from "date-fns";

//add1
// const prisma = new PrismaClient();

export default function RoomDetailById({ params: { room_id } }) {
  // add2 usestate
  const [carouselImages, setCarouselImages] = useState([]);
  const [otherRoom, setOtherRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCarouselImages = async () => {
    try {
      const images = await axios.get(`/api/room_detail/${room_id}`); // Fetch images from Prisma
      setCarouselImages(images.data.data);
      setOtherRoom(images.data.otherRoomImages);
      console.log(images);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  const getRoomType = (bedType) => {
    switch (bedType) {
      case "singleBed":
        return "Single Bed";
      case "doubleBed":
        return "Double Bed";
      case "doubleBed(kingSize)":
        return "Double bed(king size)";
      case "twinBed":
        return "Twin Bed";
      default:
        return "bedType";
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
    <div>
      {isLoading ? (
        <LoadingPage screen={`h-screen`} />
      ) : (
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

          <div className="mt-5 flex w-4/6 flex-col">
            <h1 className="mt-4 text-[#2F3E35] ">{carouselImages.name}</h1>
            <div className="flex w-full justify-between ">
              <div className="flex w-full flex-col items-start justify-between text-[#646D89]">
                <div className="break-all">{carouselImages.description} </div>
                <div className="mt-9">
                  {carouselImages.guests} person |{" "}
                  {getRoomType(carouselImages.bedType)} |{carouselImages.size}{" "}
                  sqm
                </div>
              </div>
              <div className="flex w-full flex-col items-end justify-between">
                <div>
                  {carouselImages.promotionPrice ? (
                    <div className=" flex flex-col items-end">
                      <p className="text-left font-sans text-base font-normal text-[#646D89] line-through">
                        THB{" "}
                        {carouselImages.pricePerNight?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </p>
                      <h5>
                        THB{" "}
                        {carouselImages.promotionPrice?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </h5>
                      <p className="mt-6 font-sans text-base font-normal text-[#646D89] lg:text-right ">
                        Per Night <br /> (Including Taxes & Fees)
                      </p>
                    </div>
                  ) : (
                    <div className=" mb-5 flex flex-col items-end">
                      <h5>
                        THB{" "}
                        {carouselImages.pricePerNight?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </h5>
                      <p className="mt-6 font-sans text-base font-normal text-[#646D89] lg:text-right">
                        Per Night <br /> (Including Taxes & Fees)
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <Link href="/room_detail/">
                    <PrimaryBtn btnName="Book Now" />
                    {/* edit link to new destination */}
                  </Link>
                </div>
              </div>
            </div>

            <hr className="my-10 w-full border-[1.75px]" />
            <h3 className=" mb-5 text-[#000000]">Room Amenities</h3>
            <div className="flex-start mt-7 flex w-full">
              <div className=" w-full">
                <ul className="amenities-1 list-disc ">
                  {carouselImages?.roomAmenity?.length &&
                    carouselImages?.roomAmenity?.map((item, index, arr) => {
                      if (index < arr.length / 2) {
                        return (
                          <li key={index} className="bullet-text mt-2">
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
                          <li key={index} className="bullet-text mt-2">
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

          <div className="random-room mb-20 mt-40 flex w-full flex-col justify-center">
            <h4 className="mt-10 text-center ">Other Rooms</h4>
            <div className="mt-14 flex justify-center">
              {otherRoom?.map((item, index) => {
                if (index <= 1) {
                  return (
                    <div className="relative mx-2 my-4 h-[8rem] w-2/6 text-[#FFFFFF] md:h-[12rem] lg:h-[16rem] xl:h-[20rem]">
                      <Link href={{ pathname: `/room_detail/${item.id}` }}>
                        <Image
                          className="pointer transform brightness-75 transition-transform duration-500 hover:scale-110"
                          layout="fill"
                          objectFit="cover"
                          src={item.roomMainImage}
                          alt=""
                          unoptimized
                        />
                        <div className="absolute left-5 top-60 z-10 lg:text-xl">
                          {item.name}
                        </div>
                        <div className="absolute left-5 top-60 z-10 mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-sm xl:mt-6">
                          Explore Room →
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
