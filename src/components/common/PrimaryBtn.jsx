import React from "react";
import { cn } from "@/lib/utils";

const PrimaryBtn = ({ btnName, handleClick, primaryButton }) => {
  return (
    <button
      className={cn(
        primaryButton,
        "btn-primary btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer",
      )}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default PrimaryBtn;
