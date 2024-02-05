"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import SecondaryBtn from "@/components/common/SecondaryBtn";
import UserFooter from "@/components/UserFooter";
import Image from "next/legacy/image";
import hero from "/src/asset/homepage/hero.jpg";
import SuperiorGardenView from "/src/asset/homepage/Superior-Garden-View.jpg";
import Deluxe from "/src/asset/homepage/Deluxe.jpg";
import Superior from "/src/asset/homepage/Superior.jpg";
import PremierSeaView from "/src/asset/homepage/Premier-Sea-View.jpg";
import Supreme from "/src/asset/homepage/Supreme.jpg";
import Suite from "/src/asset/homepage/Suite.jpg";
import Spa from "/src/asset/icons/bx_spa";
import Fitness from "/src/asset/icons/healthicons_exercise-outline";
import Sauna from "/src/asset/icons/ep_hot-water";
import Lounge from "/src/asset/icons/iconoir_two-seater-sofa";
import Wifi from "/src/asset/icons/ant-design_wifi-outlined";
import Car from "/src/asset/icons/carbon_car";
import Phone from "/src/asset/icons/bx_phone-call";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          variableWidth: false,
          centerMode: false
        }
      }
    ]
  };
  return (
    <>
      <header className="relative flex h-[26rem] max-h-full items-center justify-center sm:h-[36rem] lg:h-[48rem] xl:h-[58rem]">
          <Image
            src={hero}
            alt="Neatly Hero Section"
            layout="fill"
            objectFit="cover"
          />
          <div className="to-94% absolute inset-0 bg-gradient-to-b from-black from-5% to-transparent"></div>
          <div className="z-10 flex h-full w-11/12 flex-col items-center justify-evenly border-4 border-double border-indigo-600 lg:w-5/6">
            <div>
              <h1 className="border-4 border-double border-indigo-600 text-center text-3xl text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <p>A Best Place for Your</p>
                <p>Neatly Experience</p>
              </h1>
            </div>
            <div className="h-82 flex w-full flex-row rounded-lg border-4 border-double border-indigo-600 bg-white shadow md:h-44 lg:h-48 xl:h-56">
              <div className="flex w-full flex-col items-center justify-around gap-2 border-4 border-double border-indigo-600 py-4 md:flex-row md:gap-8 md:px-16 lg:gap-10">
                <div className=" date-checkin-checkout flex grow flex-col">
                  <p className=" font-sans text-base font-normal text-[#2a2e3f]">
                    Check In - Check Out
                  </p>
                  <DatePickerWithRange checkInOut="h-10 sm:h-14 w-56 sm:w-full" />
                </div>
                <div className="room-guest-select flex flex-1 flex-col">
                  <p className=" font-sans text-base font-normal text-[#2a2e3f]">
                    Room & Guests
                  </p>
                  <Select>
                    <SelectTrigger className="h-10 w-full min-w-48 text-[#9AA1B9] sm:h-14">
                      <SelectValue placeholder="1 room, 2 quests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        1 room, 2 quests *ใช้APIจากroom_id
                      </SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <PrimaryBtn
                  primaryButton="mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1"
                  btnName="Search"
                />
              </div>
            </div>{" "}
          </div>
      </header>

      <section className="flex justify-center">
        <div className="flex h-full w-11/12 flex-col items-center border-4 border-double border-indigo-600 py-16 sm:py-20 md:py-24 lg:w-5/6 lg:py-28 xl:py-32">
          <h2 className="self-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Neatly Hotel
          </h2>
          <p className="mt-9 text-xs sm:mt-11 sm:text-sm md:mt-14 md:text-base lg:mt-16 lg:text-lg xl:mt-20 ">
            Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
            with an outdoor pool, kids' club, sports facilities and a fitness
            centre. There is also a spa, an indoor pool and saunas. All units at
            the hotel are equipped with a seating area, a flat-screen TV with
            satellite channels, a dining area and a private bathroom with free
            toiletries, a bathtub and a hairdryer. Every room in Neatly Hotel
            features a furnished balcony. Some rooms are equipped with a coffee
            machine. Free WiFi and entertainment facilities are available at
            property and also rentals are provided to explore the area.
          </p>
        </div>

      </section>

      <section className="flex">
        <div className="w-full">
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div>
          <Image
              className="h-48 w-auto"
              src={SuperiorGardenView}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={Suite}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={SuperiorGardenView}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={Suite}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={SuperiorGardenView}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={Suite}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={SuperiorGardenView}
              alt="Suite"
            />
          </div>
          <div>
          <Image
              className=""
              src={Suite}
              alt="Suite"
            />
          </div>
          
        </Slider>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center bg-[#465C50]">
          <h2 className="my-16 border-4 border-double border-indigo-600 text-[2.175rem] text-white sm:my-20 sm:text-[3.5rem] md:my-24 xl:my-28 xl:text-7xl">
            Service & Facilities
          </h2>
          <div className="mb-16 flex w-full justify-evenly border-4 border-double border-indigo-600 sm:mb-20 md:mb-24 xl:mb-28">
            <div className="flex flex-col items-center">
              <Spa className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                Spa
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Sauna className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                Sauna
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Fitness className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                Fitness
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Lounge className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                Arrival Lounge
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Wifi className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                Free Wifi
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Car className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                Parking
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-10 w-10 invert md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
              <p className="text-white max-lg:hidden lg:text-xs xl:text-sm">
                24 hours operation
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center xl:py-40 lg:py-36 md:py-28 sm:py-22 py-14">
        <h2 className="xl:mb-28 lg:mb-24 md:mb-20 sm:mb-14 mb-10 border-4 border-double border-indigo-600 text-center xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
          Service & Facilities
        </h2>

        <div className="md:grid lg:h-[120rem] md:h-[84rem] w-11/12 grid-cols-5 grid-rows-9 gap-4 lg:w-5/6 flex flex-col">
          <div className="relative col-span-5 row-span-3 flex w-full max-md:h-60 max-sm:h-48 cursor-pointer">
            <Image
              className="transform brightness-75 transition-transform duration-500 hover:scale-110"
              src={SuperiorGardenView}
              alt="Superior Garden View"
              layout="fill"
              objectFit="cover"
            />
            <div className="z-10 xl:mb-16 xl:ml-12 md:mb-12 md:ml-10 sm:mb-9 sm:ml-7 mb-7 ml-5 self-end">
              <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">Superior Garden View</p>
              <p className="xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-2 lg:text-xl md:text-lg text-sm text-white">Explore Room →</p>
            </div>
          </div>

          <div className="relative col-span-3 row-span-2 row-start-4 flex w-full max-md:h-60 max-sm:h-48 cursor-pointer">
            <Image
              className="transform brightness-75 transition-transform duration-500 hover:scale-110"
              src={Deluxe}
              alt="Deluxe"
              layout="fill"
              objectFit="cover"
            />
            <div className="z-10 xl:mb-16 xl:ml-12 md:mb-12 md:ml-10 sm:mb-9 sm:ml-7 mb-7 ml-5 self-end">
              <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">Deluxe</p>
              <p className="xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-2 lg:text-xl md:text-lg text-sm text-white">Explore Room →</p>
            </div>
          </div>

          <div className="relative col-span-2 col-start-4 row-span-2 row-start-4 flex w-full max-md:h-60 max-sm:h-48 cursor-pointer">
            <Image
              className="transform brightness-75 transition-transform duration-500 hover:scale-110"
              src={Superior}
              alt="Superior"
              layout="fill"
              objectFit="cover"
            />
            <div className="z-10 xl:mb-16 xl:ml-12 md:mb-12 md:ml-10 sm:mb-9 sm:ml-7 mb-7 ml-5 self-end">
              <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">Superior</p>
              <p className="xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-2 lg:text-xl md:text-lg text-sm text-white">Explore Room →</p>
            </div>
          </div>

          <div className="relative col-span-2 row-span-4 row-start-6 flex w-full max-md:h-60 max-sm:h-48 cursor-pointer">
            <Image
              className="transform brightness-75 transition-transform duration-500 hover:scale-110"
              src={PremierSeaView}
              alt="Premier Sea View"
              layout="fill"
              objectFit="cover"
            />
            <div className="z-10 xl:mb-16 xl:ml-12 md:mb-12 md:ml-10 sm:mb-9 sm:ml-7 mb-7 ml-5 self-end">
              <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">Premier Sea View</p>
              <p className="xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-2 lg:text-xl md:text-lg text-sm text-white">Explore Room →</p>
            </div>
          </div>

          <div className="relative col-span-3 col-start-3 row-span-2 row-start-6 flex w-full max-md:h-60 max-sm:h-48 cursor-pointer">
            <Image
              className="transform brightness-75 transition-transform duration-500 hover:scale-110"
              src={Supreme}
              alt="Supreme"
              layout="fill"
              objectFit="cover"
            />
            <div className="z-10 xl:mb-16 xl:ml-12 md:mb-12 md:ml-10 sm:mb-9 sm:ml-7 mb-7 ml-5 self-end">
              <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">Supreme</p>
              <p className="xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-2 lg:text-xl md:text-lg text-sm text-white">Explore Room →</p>
            </div>
          </div>

          <div className="relative col-span-3 col-start-3 row-span-2 row-start-8 flex w-full max-md:h-60 max-sm:h-48 cursor-pointer">
            <Image
              className="transform brightness-75 transition-transform duration-500 hover:scale-110"
              src={Suite}
              alt="Suite"
              layout="fill"
              objectFit="cover"
            />
            <div className="z-10 xl:mb-16 xl:ml-12 md:mb-12 md:ml-10 sm:mb-9 sm:ml-7 mb-7 ml-5 self-end">
              <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">Suite</p>
              <p className="xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-2 lg:text-xl md:text-lg text-sm text-white">Explore Room →</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center bg-[#E6EBE9]">
          <h2 className="border-4 border-double border-indigo-600 text-center xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl">Our Customer Says</h2>
          <p>“lorem ipsum dolor sit amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint, velit official consequat duis enim velit mollit, exercitation minim amet consequat sunt.”</p>
      </section>

      <UserFooter />
    </>);}
