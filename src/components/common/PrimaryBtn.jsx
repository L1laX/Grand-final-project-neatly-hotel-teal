import React from "react";
import { cn } from "@/lib/utils";

const PrimaryBtn = ({ btnName, handleClick, primaryButton }) => {
  return (
    <div
      className={cn(primaryButton, "btn-primary btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer")}
      onClick={handleClick}
      >
      {btnName}
    </div>
  );
};

export default PrimaryBtn;
