import React from "react";

const PrimaryBtn = ({ btnName, handleClick }) => {
  return (
    <button
      className="btn-primary btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer"
      onClick={handleClick}
      >
      {btnName}
    </button>
  );
};

export default PrimaryBtn;
