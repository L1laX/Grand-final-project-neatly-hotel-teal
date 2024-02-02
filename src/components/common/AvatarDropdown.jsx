import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

import UserAvatar from "@/asset/icons/user.svg";
export default function AvatarDropdown({ image, name }) {
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
          <DropdownMenuItem onClick={() => alert("profile page")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("bookings page")}>
            Booking
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
