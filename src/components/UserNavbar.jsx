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
const UserNavbar = ({ aboutid, serviceid, roomsid }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  return (
    <section className="flex w-full items-center justify-center border-4 border-double border-indigo-600 bg-white py-8">
      <div className="flex w-11/12 justify-between border-4 border-double border-indigo-600 lg:w-5/6">
        <div className="web-menu flex items-center">
          <div className="logo flex">
            <Link href={"/"} className="hover:opacity-90">
              <Image src={Logo}></Image>
            </Link>
          </div>
          <div className="menu ml-5 gap-5 max-md:hidden md:flex">
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
                <div className="mr-7 cursor-pointer">
                  <Image
                    src={Frame}
                    className="cursor-pointer opacity-50 hover:animate-bounce"
                  />
                </div>

                <AvatarDropdown
                  image={session?.user.image}
                  name={session?.user.username}
                  session_id={session?.user.id}
                />
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
