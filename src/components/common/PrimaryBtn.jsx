import React from "react";

const PrimaryBtn = ({ btnName }) => {
  return (
    <div className="btn-primary btn-primary:hover btn-primary:active btn-primary:disabled cursor-pointer">
      {btnName}
    </div>
  );
};

export default PrimaryBtn;
