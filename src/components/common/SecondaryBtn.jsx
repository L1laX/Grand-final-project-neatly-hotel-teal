import React from "react";

const SecondaryBtn = ({ btnName, handleClick }) => {
  return (
    <div
      className="btn-secondary btn-secondary:hover btn-secondary:active btn-secondary:disabled cursor-pointer"
      onClick={handleClick}
      >
      {btnName}
    </div>
  );
};

export default SecondaryBtn;
