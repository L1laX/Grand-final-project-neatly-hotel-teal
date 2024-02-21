import React from "react";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";

const SecondaryBtn = ({ btnName, handleClick, secondaryButton, google }) => {
  return (
    <button
      className={cn(
        secondaryButton,
        "btn-secondary btn-secondary:hover btn-secondary:active btn-secondary:disabled cursor-pointer",
      )}
      onClick={handleClick}
    >
      {google ? (
        <>
          <FcGoogle className="inline-block h-full" />
          login with Google
        </>
      ) : (
        ""
      )}
      {btnName}
    </button>
  );
};

export default SecondaryBtn;
