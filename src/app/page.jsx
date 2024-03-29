"use client";

import { useRef, useState, useEffect } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import UserFooter from "@/components/UserFooter";
import Image from "next/legacy/image";
import Hero from "/src/asset/homepage/hero.jpg";
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
import ScrollToTopButton from "@/components/ui/scrollToTop";
import NextPrevBtn from "@/asset/icons/next_button";
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
import "./react-slick.css";
import UserNavbar from "@/components/UserNavbar";
import { DateRangeRoomGuest } from "@/components/ui/DateRangeRoomGuest";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  // const [room, setRoom] = useState(1);
  // const [guest, setGuest] = useState(1);
  const router = useRouter();
  const [roomAndGuest, setRoomAndGuest] = useState({
    room: 1,
    guest: 2,
  });

  const imgSlider = useRef(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsComments = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dateString = JSON.stringify({
    from: date?.from
      ? format(date?.from, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
      : null,
    to: date?.to ? format(date?.to, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
  });

  const roomAndGuestString = JSON.stringify({
    room: roomAndGuest?.room ? roomAndGuest?.room : null,
    guest: roomAndGuest?.guest ? roomAndGuest?.guest : null,
  });

  const sendValueToRoomDetails = {
    dateString,
    roomAndGuestString,
  };
  console.log(sendValueToRoomDetails);

  const handleClickSearch = () => {
    if (!date?.from && !date?.to) {
      alert("please choose checkin date and checkout date");
    } else if (!date?.from) {
      alert("please choose checkin date");
    } else if (!date?.to) {
      alert("please choose checkout date");
    } else if (
      format(date?.from, "yyyy-MM-dd") === format(date?.to, "yyyy-MM-dd")
    ) {
      alert("At least 2 days 1 night");
    }
  };
  return (
    <>
      <div class="fixed bottom-4 right-2 z-50 h-14 w-14 lg:bottom-6 lg:right-6">
        <ScrollToTopButton />
      </div>
      <UserNavbar
        aboutid={"#about"}
        serviceid={"#service"}
        roomsid={"#rooms"}
        isHomepage={true}
      />
      <header className="relative flex h-[26rem] max-h-full items-center justify-center sm:h-[36rem] lg:h-[48rem] xl:h-[58rem] 2xl:h-[62rem]">
        <Image
          src={Hero}
          alt="Neatly Hero Section"
          layout="fill"
          objectFit="cover"
        />

        <div className="to-94% from-1% absolute inset-0 bg-gradient-to-b from-neutral-900 to-transparent"></div>
        <div className="z-10 flex h-full w-11/12 flex-col items-center justify-evenly lg:w-5/6">
          <div>
            <h1 className="text-center text-3xl text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <p>A Best Place for Your</p>
              <p>Neatly Experience</p>
            </h1>
          </div>
          <div className="h-82 flex w-full flex-row rounded-lg bg-white shadow md:h-44 lg:h-48 xl:h-56">
            <div className="flex w-full flex-col items-center justify-around gap-2 py-4 md:flex-row md:gap-8 md:px-16 lg:gap-10">
              <DateRangeRoomGuest
                handleDateRangeRoomGuest={{
                  calendarDesign: "h-10 sm:h-14 w-56 sm:w-full",
                  date: date,
                  setDate: setDate,
                  roomAndGuest: roomAndGuest,
                  setRoomAndGuest: setRoomAndGuest,
                }}
              />
              {/* {!date?.from || !date?.to ? (
            <Link
              href={{ pathname: false }}
            >
              <PrimaryBtn btnName="Search" handleClick={handleClickSearch} primaryButton="mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1" />
            </Link>
            ) : (
              <Link
                href={{ pathname: "/room_detail", query: { ...sendValueToRoomDetails } }}
              >
                <PrimaryBtn btnName="Search" primaryButton="mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1" />
              </Link>
            )} */}
              <Link
                href={{
                  pathname:
                    !date?.from ||
                    !date?.to ||
                    format(date?.from, "yyyy-MM-dd") ===
                      format(date?.to, "yyyy-MM-dd")
                      ? false
                      : "/room_detail",
                  query:
                    !date?.from ||
                    !date?.to ||
                    format(date?.from, "yyyy-MM-dd") ===
                      format(date?.to, "yyyy-MM-dd")
                      ? false
                      : { ...sendValueToRoomDetails },
                }}
              >
                <PrimaryBtn
                  btnName="Search"
                  primaryButton="mt-6 max-w-44 min-w-40 h-10 sm:h-14 flex flex-1"
                  handleClick={handleClickSearch}
                />
              </Link>
            </div>
          </div>{" "}
        </div>
      </header>

      <section id="about" className=" flex justify-center">
        <div className="flex h-full w-11/12 flex-col items-center py-16 sm:py-20 md:py-24 lg:w-5/6 lg:py-28 xl:py-32">
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
      <section id="service" className="relative mb-20 flex items-center">
        <div className="absolute left-3 top-1/2 z-50 -translate-y-1/2 transform sm:left-14 lg:left-20">
          <button className="" onClick={() => imgSlider?.current?.slickPrev()}>
            <NextPrevBtn className="h-8 w-8 rotate-180 transition duration-200 ease-in-out hover:scale-90 md:h-10 md:w-10  lg:h-14 lg:w-14" />
          </button>
        </div>
        <div className="absolute right-3 top-1/2 z-50 -translate-y-1/2 transform sm:right-14 lg:right-20">
          <button className="" onClick={() => imgSlider?.current?.slickNext()}>
            <NextPrevBtn className="h-8 w-8 rotate-0 transition duration-200 ease-in-out hover:scale-90 md:h-10 md:w-10  lg:h-14 lg:w-14" />
          </button>
        </div>
        <div className="w-full">
          <Slider ref={imgSlider} {...settings}>
            <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[34rem]">
              <Image
                className="cursor-grab active:cursor-grabbing"
                layout="fill"
                objectFit="cover"
                src={SuperiorGardenView}
                alt="Suite"
              />
            </div>
            <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[34rem]">
              <Image
                className="cursor-grab active:cursor-grabbing"
                src={Superior}
                alt="Suite"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[34rem]">
              <Image
                className="cursor-grab active:cursor-grabbing"
                src={Deluxe}
                alt="Suite"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[34rem]">
              <Image
                className="cursor-grab active:cursor-grabbing"
                src={PremierSeaView}
                alt="Suite"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[34rem]">
              <Image
                className="cursor-grab active:cursor-grabbing"
                src={Supreme}
                alt="Suite"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-[16rem] md:h-[20rem] lg:h-[24rem] xl:h-[34rem]">
              <Image
                className="cursor-grab active:cursor-grabbing"
                src={Suite}
                alt="Suite"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Slider>
        </div>
      </section>

      <section id="rooms">
        <div className="flex flex-col items-center bg-[#465C50]">
          <h2 className="my-16 text-[2.175rem] text-white sm:my-20 sm:text-[3.5rem] md:my-24 xl:my-28 xl:text-7xl">
            Service & Facilities
          </h2>
          <div className="mb-16 flex w-11/12 justify-evenly sm:mb-20 md:mb-24 xl:mb-28">
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

      <section className="sm:py-22 flex flex-col items-center py-14 md:py-28 lg:py-36 xl:py-40">
        <h2 className="mb-10 text-center text-4xl sm:mb-14 sm:text-5xl md:mb-20 md:text-6xl lg:mb-24 lg:text-7xl xl:mb-28 xl:text-8xl">
          Rooms & Suits
        </h2>

        <div className="flex w-11/12 grid-cols-5 grid-rows-9 flex-col gap-4 md:grid md:h-[84rem] lg:h-[120rem] lg:w-5/6">
          <div className="relative col-span-5 row-span-3 flex w-full cursor-pointer max-md:h-60 max-sm:h-48">
            <Link href="/room_detail/1c7f1802-b497-443d-88e1-e860bd224577">
              <Image
                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                src={SuperiorGardenView}
                alt="Superior Garden View"
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="z-10 mb-7 ml-5 self-end sm:mb-9 sm:ml-7 md:mb-12 md:ml-10 xl:mb-16 xl:ml-12">
              <p className="text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Superior Garden View
              </p>
              <p className="mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-xl xl:mt-6">
                Explore Room →
              </p>
            </div>
          </div>

          <div className="relative col-span-3 row-span-2 row-start-4 flex w-full cursor-pointer max-md:h-60 max-sm:h-48">
            <Link href="/room_detail/0c70f943-5312-46d8-9080-521526b2b831">
              <Image
                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                src={Deluxe}
                alt="Deluxe"
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="z-10 mb-7 ml-5 self-end sm:mb-9 sm:ml-7 md:mb-12 md:ml-10 xl:mb-16 xl:ml-12">
              <p className="text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Deluxe
              </p>
              <p className="mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-xl xl:mt-6">
                Explore Room →
              </p>
            </div>
          </div>

          <div className="relative col-span-2 col-start-4 row-span-2 row-start-4 flex w-full cursor-pointer max-md:h-60 max-sm:h-48">
            <Link href="/room_detail/70be1885-e697-47ee-98e4-679d67f13b55">
              <Image
                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                src={Superior}
                alt="Superior"
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="z-10 mb-7 ml-5 self-end sm:mb-9 sm:ml-7 md:mb-12 md:ml-10 xl:mb-16 xl:ml-12">
              <p className="text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Superior
              </p>
              <p className="mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-xl xl:mt-6">
                Explore Room →
              </p>
            </div>
          </div>

          <div className="relative col-span-2 row-span-4 row-start-6 flex w-full cursor-pointer max-md:h-60 max-sm:h-48">
            <Link href="/room_detail/6affa6d0-2993-43ff-94c0-96e7cb7a0c12">
              <Image
                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                src={PremierSeaView}
                alt="Premier Sea View"
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="z-10 mb-7 ml-5 self-end sm:mb-9 sm:ml-7 md:mb-12 md:ml-10 xl:mb-16 xl:ml-12">
              <p className="text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Premier Sea View
              </p>
              <p className="mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-xl xl:mt-6">
                Explore Room →
              </p>
            </div>
          </div>

          <div className="relative col-span-3 col-start-3 row-span-2 row-start-6 flex w-full cursor-pointer max-md:h-60 max-sm:h-48">
            <Link href="/room_detail/1212592a-55c8-48b5-b977-7d60de580dc1">
              <Image
                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                src={Supreme}
                alt="Supreme"
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="z-10 mb-7 ml-5 self-end sm:mb-9 sm:ml-7 md:mb-12 md:ml-10 xl:mb-16 xl:ml-12">
              <p className="text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Supreme
              </p>
              <p className="mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-xl xl:mt-6">
                Explore Room →
              </p>
            </div>
          </div>

          <div className="relative col-span-3 col-start-3 row-span-2 row-start-8 flex w-full cursor-pointer max-md:h-60 max-sm:h-48">
            <Link href="/room_detail/77a26f05-297c-4930-aaf7-d3e10a77cd44">
              <Image
                className="transform brightness-75 transition-transform duration-500 hover:scale-110"
                src={Suite}
                alt="Suite"
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="z-10 mb-7 ml-5 self-end sm:mb-9 sm:ml-7 md:mb-12 md:ml-10 xl:mb-16 xl:ml-12">
              <p className="text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Suite
              </p>
              <p className="mt-2 text-sm text-white sm:mt-3 md:mt-4 md:text-lg lg:mt-5 lg:text-xl xl:mt-6">
                Explore Room →
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center bg-[#E6EBE9]">
        <div className="flex h-full w-11/12 flex-col items-center justify-evenly lg:w-5/6">
          <h2 className="my-10 text-center text-4xl sm:my-14 sm:text-5xl md:my-20 md:text-6xl lg:my-24 lg:text-7xl xl:my-28 xl:text-8xl">
            Our Customer Says
          </h2>
          <div className="mb-10 w-full sm:mb-14 sm:text-5xl md:mb-20 md:text-6xl lg:mb-24 lg:text-7xl xl:mb-28">
            <Slider {...settingsComments}>
              <div>
                <h3 className="px-10 text-center max-sm:text-3xl lg:px-20">
                  “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                  est sit aliqua dolor do amet sint, velit official consequat
                  duis enim velit mollit, exercitation minim amet consequat
                  sunt.”
                </h3>
              </div>
              <div>
                <h3 className="px-10 text-center max-sm:text-3xl lg:px-20">
                  “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                  est sit aliqua dolor do amet sint, velit official consequat
                  duis enim velit mollit, exercitation minim amet consequat
                  sunt.”
                </h3>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <UserFooter />
    </>
  );
}
