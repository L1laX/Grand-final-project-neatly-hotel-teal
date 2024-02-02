import React from "react";

const SecondaryBtn = ({ btnName, handleClick }) => {
  return (
    <button
      className="btn-secondary btn-secondary:hover btn-secondary:active btn-secondary:disabled cursor-pointer"
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default SecondaryBtn;
