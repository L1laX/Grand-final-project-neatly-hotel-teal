import React from "react";
import { cn } from "@/lib/utils";

const SecondaryBtn = ({ btnName, handleClick, secondaryButton }) => {
  return (
    <button
    className={cn(secondaryButton, "btn-secondary btn-secondary:hover btn-secondary:active btn-secondary:disabled cursor-pointer")}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default SecondaryBtn;
