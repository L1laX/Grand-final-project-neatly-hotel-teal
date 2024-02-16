import { useState } from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/common/DatePicker";
import Country from "@/components/common/Country";
import PrimaryBtn from "@/components/common/PrimaryBtn";

// Step 1 : FormInformation
const FormInformation = ({
  nextStep,
  handleInputChange,
  values,
  getCountry,
  getdateOfBirth,
}) => {
  const [errors, setErrors] = useState({});

  const validateDateofBirth = (date) => {
    if (!date) {
      return true;
    }
    const ageDifMs = Date.now() - new Date(date).getTime();
    const ageDate = new Date(ageDifMs);
    const ageDifference = Math.abs(ageDate.getUTCFullYear() - 1970);
    const errors = {
      dateOfBirth: ageDifference < 18,
    };
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
    return errors.dateOfBirth;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = values.email.split(".");
    const lastedEmail = email[email.length - 1];
    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error = {
      fullName: !values.fullName,
      dateOfBirth: validateDateofBirth(values.dateOfBirth),
      email:
        !values.email.length ||
        !values.email.toLowerCase().match(validEmailRegex) ||
        !lastedEmail === "com" ||
        !lastedEmail === "co" ||
        !lastedEmail === "org",
      id_number: values.id_number.length !== 13,
      country: values.country.length < 1,
    };
    setErrors({ ...error });
    if (
      error.fullName ||
      error.dateOfBirth ||
      error.email ||
      error.id_number ||
      error.country
    ) {
      return;
    }

    nextStep();
  };

  return (
    <form className="mr-6 rounded bg-white p-10" onSubmit={handleSubmit}>
      {/* Basic Information */}
      <h5 className="mb-10 text-[#9AA1B9]">Basic Information</h5>
      <div className="fullname-container relative grid grid-cols-1 pb-10">
        <label htmlFor="fullname">
          Fullname
          <Input
            className={`grid outline-none ${errors.fullName && "border-red-600"}`}
            type="text"
            name="fullName"
            onChange={handleInputChange}
            value={values.fullName}
            placeholder="fullname"
          />
        </label>
        {errors.fullName && (
          <div className=" absolute bottom-3 text-red-600">
            Please enter your name
          </div>
        )}
      </div>
      <div className=" email-container relative pb-10">
        <label htmlFor="email">
          Email
          <Input
            className={`grid outline-none ${errors.email && "border-red-600"}`}
            type="email"
            name="email"
            onChange={handleInputChange}
            value={values.email}
            placeholder="email"
          />
        </label>
        {errors.email && (
          <div className="absolute bottom-3 text-red-600">
            email is not valid
          </div>
        )}
      </div>
      <div className=" id_number-container relative pb-10">
        <label htmlFor="id_number">
          ID Number
          <Input
            className={`grid outline-none ${errors.id_number && "border-red-600"}`}
            type="text"
            name="id_number"
            onChange={handleInputChange}
            value={values.id_number}
            placeholder="id_number"
          />
        </label>
        {errors.id_number && (
          <div className=" absolute bottom-3 text-red-600">
            ID number must be 13 characters
          </div>
        )}
      </div>
      <div className="dateOfBirth-container relative pb-10">
        <label htmlFor="dateOfBirth">
          <div>
            <DatePicker
              selected=""
              getdateOfBirth={getdateOfBirth}
              value={values.dateOfBirth}
            />
          </div>
        </label>
        {errors.dateOfBirth && (
          <div className=" absolute bottom-3 text-red-600">
            Your age must not empty and be greater than 18.
          </div>
        )}
      </div>
      <div className="country-container relative pb-10">
        <label htmlFor="Country">
          Country
          <Country
            setCountry={getCountry}
            value={values.country}
            className={`h-[60px] outline-none hover:border-orange-500 focus:border-orange-500 ${errors.country && "border-red-600"}`}
          />
        </label>
        {errors.country && (
          <div className=" absolute bottom-3 text-red-600">
            Please select your country
          </div>
        )}
      </div>
      {/* Booking Button */}
      <div className=" flex flex-row justify-between">
        <button className=""></button>
        <PrimaryBtn btnName="Next" handleClick={handleSubmit}></PrimaryBtn>
      </div>
    </form>
  );
};

export default FormInformation;
