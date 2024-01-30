import React from "react";

const SecondaryBtn = ({ btnName }) => {
  return (
    <div className="btn-secondary btn-secondary:hover btn-secondary:active btn-secondary:disabled cursor-pointer ">
      {btnName}
    </div>
  );
};

export default SecondaryBtn;
