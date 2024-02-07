import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import LogoutIcon from "@/asset/icons/logout.svg";
import BookingIcon from "@/asset/icons/booking.svg";
import UserAvatar from "@/asset/icons/user.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function AvatarDropdown({ image, name, session_id }) {
  const router = useRouter();
  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`rounded-full shadow-md outline-none hover:opacity-95 hover:shadow-2xl ${!image ? "opacity-50" : ""}`}
        >
          <Avatar>
            <AvatarImage src={image ?? UserAvatar.src} />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Hello {name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="content-section py-1">
            <DropdownMenuItem
              onClick={() => router.push(`/user/${session_id}/profile`)}
            >
              <div className="section flex  justify-center gap-2">
                <span className="image h-7 w-7 opacity-40 hover:opacity-75">
                  <Image src={UserAvatar} alt="User-icon" />
                </span>
                <p className=" hover:opacity-85">Profile</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/user/${session_id}/booking_history`)}
            >
              <div className="section flex  justify-center gap-2">
                <span className="image h-7 w-7 opacity-40 hover:opacity-75">
                  <Image src={BookingIcon} alt="Booking-icon" />
                </span>
                <p className=" hover:opacity-85"> Booking</p>
              </div>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <div className="section flex  justify-center gap-2">
              <span className="image h-7 w-7 opacity-40 hover:opacity-75">
                <Image src={LogoutIcon} alt="Logout-icon" />
              </span>
              <p className=" hover:opacity-85"> Log out</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
