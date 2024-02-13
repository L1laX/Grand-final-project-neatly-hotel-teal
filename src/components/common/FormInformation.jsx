import { useState } from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/DatePicker";
import Country from "@/components/common/Country";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { Button } from "react-day-picker";

// Step 1 : FormInformation
const FormInformation = ({ nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form className="mr-6 rounded bg-white p-10" onSubmit={handleSubmit}>
      {/* Basic Information */}
      <h5 className="mb-10 text-[#9AA1B9]">Basic Information</h5>
      <div className="fullname-container grid grid-cols-1 pb-10">
        <label htmlFor="fullname">
          Fullname
          <Input
            className="grid outline-none"
            type="text"
            name="fullName"
            onChange={(e) => {
              e.target.value;
            }}
            value=""
            placeholder="fullname"
          />
        </label>
      </div>
      <div className=" email-container pb-10">
        <label htmlFor="email">
          Email
          <Input
            className="grid outline-none"
            type="email"
            name="email"
            onChange={(e) => {
              e.target.value;
            }}
            value=""
            placeholder="email"
          />
        </label>
      </div>
      <div className=" id_number-container pb-10">
        <label htmlFor="id_number">
          ID Number
          <Input
            className="grid outline-none"
            type="text"
            name="id_number"
            onChange={(e) => {
              e.target.value;
            }}
            value=""
            placeholder="id_number"
          />
        </label>
      </div>
      <div className="dateOfBirth-container pb-10">
        <label htmlFor="dateOfBirth">
          Date of Birth
          <div>
            <DatePicker
              selected=""
              onSelect={(e) => {
                e.target.value;
              }}
            />
          </div>
        </label>
      </div>
      <div className="country-container pb-10">
        <label htmlFor="Country">
          Country
          <Country
            setCountry={(e) => {
              e.target.value;
            }}
          />
        </label>
      </div>
      {/* Booking Button */}
      <div className=" flex flex-row justify-between">
        <button className=""></button>
        <PrimaryBtn btnName="Next" handleClick={nextStep}></PrimaryBtn>
      </div>
    </form>
  );
};

export default FormInformation;
