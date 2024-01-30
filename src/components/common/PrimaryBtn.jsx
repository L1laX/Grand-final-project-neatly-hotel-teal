import React from "react";

const PrimaryBtn = ({ btnName, handleClick }) => {
  return (
    <div
      className="btn-primary btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer"
      onClick={handleClick}
    >
      {btnName}
    </div>
  );
};

export default PrimaryBtn;
