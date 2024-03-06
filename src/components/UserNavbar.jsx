"use client";
import { useRouter } from "next/navigation";
import Frame from "@/asset/icons/Frame.svg";
import Image from "next/image";
import Link from "next/link";
import PrimaryBtn from "./common/PrimaryBtn";
import AvatarDropdown from "./common/AvatarDropdown";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabase";
const UserNavbar = ({ aboutid, serviceid, roomsid }) => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();
  const [hotelLogoPreview, setHotelLogoPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const getLogo = async () => {
    const res = await axios.get("/api/admin/hotel_info");
    const oldPath = localStorage.getItem("path");
    if (res.data.data[0].image !== oldPath) {
      localStorage.setItem("path", res.data.data[0].image);
      const { data, error } = supabase.storage
        .from("logo")
        .getPublicUrl(res.data.data[0].image);
      if (!error) {
        setHotelLogoPreview(data.publicUrl);
        localStorage.setItem("hotelLogo", data.publicUrl);
      } else {
        console.error(
          "Error fetching image from Supabase Storage:",
          imageError,
        );
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    const hotelLogo = localStorage.getItem("hotelLogo");
    if (hotelLogo) {
      setHotelLogoPreview(hotelLogo);
      setLoading(false);
    }
    getLogo();
  }, []);
  return (
    <section className="flex w-full items-center justify-center bg-white py-5">
      <div className="flex w-11/12 justify-between lg:w-5/6">
        <div className="web-menu flex items-center">
          {loading ? (
            <div role="status" className="mr-20 mt-2">
              <svg
                aria-hidden="true"
                className="inline h-8 w-8 animate-spin fill-orange-500 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="logo flex">
              <Link href={"/"} className="hover:opacity-90">
                <Image src={hotelLogoPreview} width={150} height={150}></Image>
              </Link>
            </div>
          )}
          <div className="menu ml-5 gap-5 max-md:hidden md:flex">
            <a
              href={aboutid || "/#about"}
              className="cursor-pointer hover:opacity-75"
              // onClick={() => {
              //   toSection(aboutid);
              // }}
            >
              About Neatly
            </a>
            <a
              href={serviceid || "/#service"}
              className="cursor-pointer hover:opacity-75"
              // onClick={() => {
              //   toSection(serviceid);
              // }}
            >
              Service & Facilities
            </a>

            <a
              href={roomsid || "/#rooms"}
              className="cursor-pointer hover:opacity-75"
              // onClick={() => {
              //   toSection(roomsid);
              // }}
            >
              Rooms & Suits
            </a>
          </div>
        </div>

        <div className="user-menu">
          <div className="none-user flex items-center justify-items-end justify-self-end ">
            {session?.user?.role === "admin" ? (
              <PrimaryBtn
                primaryButton={"bg-green-500 hover:bg-green-600"}
                btnName="To Admin Panel"
                handleClick={() => {
                  router.push("/admin");
                }}
              />
            ) : session?.user ? (
              <div className="dropdown relative flex items-center">
                <div className="mr-7 cursor-pointer">
                  <Image
                    src={Frame}
                    className="cursor-pointer opacity-50 hover:animate-bounce"
                  />
                </div>

                <AvatarDropdown
                  image={session?.user.image}
                  name={
                    session?.user.username || session?.user.name.split(" ")[0]
                  }
                  session_id={session?.user.id}
                />
              </div>
            ) : status === "loading" ? (
              <div role="status" className="mr-20 mt-2">
                <svg
                  aria-hidden="true"
                  className="inline h-8 w-8 animate-spin fill-orange-500 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <button
                  className="visitlink visitlink:hover visitlink:disabled"
                  onClick={() => signIn()}
                >
                  Login
                </button>
                <PrimaryBtn
                  btnName="BookNow"
                  handleClick={() => {
                    router.push("/room_detail");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNavbar;
