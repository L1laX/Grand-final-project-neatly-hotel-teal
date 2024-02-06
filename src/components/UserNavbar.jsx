"use client";
import { useRouter } from "next/navigation";
import Frame from "@/asset/icons/Frame.svg";
import Image from "next/image";
import Logo from "@/asset/logo/logo-dark.svg";
import Link from "next/link";
import PrimaryBtn from "./common/PrimaryBtn";
import AvatarDropdown from "./common/AvatarDropdown";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
const UserNavbar = ({ aboutid, serviceid, roomsid, isHomepage }) => {
  let ishomePage = isHomepage || null;
  // const toSection = (section) => {
  //   if (!ishomePage) {
  //     router.push(`/?section=${section}&isClick=true`);
  //   }

  //   if (ishomePage) {
  //     alert("Hello");
  //   }
  // };
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <section className="flex py-8 w-full items-center justify-center bg-white border-4 border-double border-indigo-600">
      <div className="border-double w-11/12 lg:w-5/6 border-4 border-indigo-600 flex justify-between">
      <div className="web-menu flex items-center">
        <div className="logo flex">
          <Link href={"/"} className="hover:opacity-90">
            <Image src={Logo}></Image>
          </Link>
        </div>
        <div className="menu ml-5 max-md:hidden gap-5 md:flex">
          <a
            href={aboutid || "about"}
            className="cursor-pointer hover:opacity-75"
            // onClick={() => {
            //   toSection(aboutid);
            // }}
          >
            About Neatly
          </a>
          <a
            href={serviceid || "/"}
            className="cursor-pointer hover:opacity-75"
            // onClick={() => {
            //   toSection(serviceid);
            // }}
          >
            Service & Facilities
          </a>
          <a
            href={roomsid || "rooms"}
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
          {session ? (
            <div className="dropdown relative flex items-center">
              <div className="cursor-pointer mr-7">
                <Image
                  src={Frame}
                  className="cursor-pointer opacity-50 hover:animate-bounce"
                />
              </div>

              <AvatarDropdown
                image={session?.user.image}
                name={session?.user.username}
              />
            </div>
          ) : (
            <div className="flex items-center">
              <button
                className="visitlink visitlink:hover visitlink:disabled px-7"
                onClick={() => signIn()}
              >
                Login
              </button>
              <Link href={"/booking"} className="border-4 border-double border-indigo-600">
                <PrimaryBtn btnName="BookNow" primaryButton=""/>
              </Link>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default UserNavbar;
