"use client";

import bg1 from "@/asset/background/register/bg1.jpg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Image from "next/image";
import { useEffect, useState } from "react";
//import Validation from "./registervalidation.js";
const Register = () => {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    password: "",
    dateofBirth: "",
    email: "",
    idNumber: "",
    country: "",
    cardnumber: "",
    expiryDate: "",
    cardOwner: "",
    cvv_cvc: "",
  });
  console.log(values);

  const getValue = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    fullname: false,
    username: false,
    password: false,
    passwordLength: false,
    dateofBirthempty: false,
    dateofBirth: false,
    email: false,
    idNumber: false,
    country: false,
    cardnumber: false,
    cardnumber16: false,
    expiryDate: false,
    cardOwner: false,
    cvv_cvc: false,
  });

  const validateCreditCardNumber = (cardNumber) => {
    const formattedCardNumber = cardNumber.replace(/\s/g, "");
    return /^\d{16}$/.test(formattedCardNumber);
  };

  const validateDateofBirth = (date) => {
    const currentDate = new Date();
    const selectedDate = date ? new Date(date) : new Date(NaN);
    const ageDifference =
      currentDate.getFullYear() - selectedDate.getFullYear();

    const errors = {
      dateofBirth: ageDifference < 18 || isNaN(selectedDate.getTime()),
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return errors.dateofBirth;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({
      fullname: !values.fullname.trim(),
      username: !values.username.trim(),
      password: !values.password.trim(),
      passwordLength: values.password.length < 8,
      dateofBirthempty: !values.dateofBirth.trim(),
      dateofBirth: validateDateofBirth(values.dateofBirth),
      email: !(values.email.trim() && values.email.includes("@")),
      idNumber: !values.idNumber.trim(),
      country: !values.country.trim(),
      cardnumber: !values.cardnumber.trim(),
      cardnumber16: !validateCreditCardNumber(values.cardnumber),
      expiryDate: !values.expiryDate.trim(),
      cardOwner: !values.cardOwner.trim(),
      cvv_cvc: !values.cvv_cvc.trim(),
    });
  };

  return (
    <div className="flex h-[1500px] w-auto items-center justify-center    md:h-[1777px]  md:w-auto">
      <div className="  relative hidden  h-[1777px]  w-[1980px] items-center sm:hidden md:block md:w-auto md:justify-center ">
        <Image src={bg1} layout="" />
      </div>
      <form className="  absolute h-[1300px] items-center  justify-center rounded  bg-slate-50  p-10 shadow md:h-[1626px]  md:w-[1092px]  ">
        <div className=" md:flex-col">
          <h2 className="mb-4 text-start text-[50px] font-bold  md:mb-[50px] md:text-start">
            Register
          </h2>
          <h4 className=" text-start text-sm md:mb-[50px] md:text-start">
            BasicInformation
          </h4>
        </div>
        <div className="md:flex-col">
          <div className="w-fit   md:justify-center">
            <h1 htmlFor="text-input" class=" text-sm font-medium text-gray-600">
              FullName
            </h1>

            <input
              onChange={getValue}
              name="fullname"
              type="text"
              id="text-input"
              className=" md:  mt-1  rounded-md border border-gray-300 p-2 md:mb-[50px]  md:w-[930px]"
              placeholder="Enter text..."
            />
            {errors.fullname && (
              <div className="      text-red-600">Please enter your name</div>
            )}
          </div>
          <div className="  gap-5   md:flex  md:w-[932px] md:items-center  md:justify-between  md:justify-items-center ">
            <div className="    w-3/5 flex-col  ">
              <div className="   ">
                <h1
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  UserName
                </h1>
                <input
                  // onChange={getUserName}
                  type="text"
                  onChange={getValue}
                  id="text-input"
                  name="username"
                  className="mt-1 w-full  rounded-md border border-gray-300 p-2   md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.username && (
                  <div className="      text-red-600">
                    Please enter your username
                  </div>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  password
                </label>
                <input
                  // onChange={getPassword}
                  type="password"
                  id="text-input"
                  onChange={getValue}
                  name="password"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.password && (
                  <div className="      text-red-600">
                    Please enter your password
                  </div>
                )}
                {errors.passwordLength && (
                  <div className="      text-red-600">
                    Password must be at least 8 characters long
                  </div>
                )}
              </div>
              <div className=" ">
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Date of Birth
                </lable>
                <input
                  // onChange={getDate}
                  type="date"
                  id="text-input"
                  name="dateofBirth"
                  onChange={getValue}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.dateofBirthempty && (
                  <div className="      text-red-600">
                    Please enter your date of birth
                  </div>
                )}
                {errors.dateofBirth && (
                  <div className="      text-red-600">
                    You must be at least 18 years old
                  </div>
                )}
              </div>
            </div>
            <div className="   w-3/5  flex-col justify-start ">
              <div className=" ">
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Email
                </lable>
                <input
                  // onChange={getEmail}
                  type="text"
                  id="text-input"
                  name="email"
                  onChange={getValue}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.email && (
                  <div className="      text-red-600">
                    Please enter a valid email address
                  </div>
                )}
              </div>
              <div className="">
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  ID Number
                </lable>
                <input
                  // onChange={getIdNumber}
                  type="text"
                  id="text-input"
                  name="idNumber"
                  onChange={getValue}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.idNumber && (
                  <div className="      text-red-600">
                    Please enter your ID number
                  </div>
                )}
              </div>
              <div className="">
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Country
                </lable>
                <input
                  // onChange={getCountry}
                  type="text"
                  id="text-input"
                  onChange={getValue}
                  name="country"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.country && (
                  <div className="      text-red-600">
                    Please enter your country
                  </div>
                )}
              </div>
            </div>
          </div>
          <br></br>
          <div class="border-b-2 border-gray-300  shadow-md md:w-[930px] md:border-b-2 md:border-gray-300  md:shadow-md"></div>
          Profile Picture
          <div class="border-b-2 border-gray-300 shadow-md  md:w-[930px] md:border-b-2 md:border-gray-300 md:shadow-md  "></div>
          <br></br>
          <div>
            <div className="md:mb-[50px] md:flex-col">
              <h4 className=" text-sm">Credit Card</h4>
            </div>
            <br></br>
            <div className="  gap-5   md:flex md:w-[932px]  md:items-center md:justify-center md:justify-between md:justify-items-center ">
              <div className="md:justify-center">
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Card Number
                </lable>
                <input
                  // onChange={getCard}
                  type="text"
                  id="text-input"
                  name="cardnumber"
                  onChange={getValue}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                  placeholder="Enter text..."
                />
                {errors.cardnumber && (
                  <div className="      text-red-600">
                    Please enter your card number
                  </div>
                )}
                {errors.cardnumber16 && (
                  <div className="      text-red-600">
                    Please enter your card number 16
                  </div>
                )}
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Expiry Date
                </lable>
                <input
                  // onChange={getExpriry}
                  type="text"
                  id="text-input"
                  name="expiryDate"
                  onChange={getValue}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.expiryDate && (
                  <div className="      text-red-600">
                    Please enter your card's expiry date
                  </div>
                )}
              </div>
              <div>
                <lable
                  htmlFor="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Card Owner
                </lable>
                <input
                  // onChange={getCardOwner}
                  type="text"
                  id="text-input"
                  onChange={getValue}
                  name="cardOwner"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                  placeholder="Enter text..."
                />
                {errors.cardOwner && (
                  <div className="  text    text-red-600">
                    Please enter the card owner's name
                  </div>
                )}

                <lable
                  htmlFor="text-input"
                  className="text-sm font-medium text-gray-600"
                >
                  CVC/CVV
                </lable>
                <input
                  // onChange={getCvcCvv}
                  type="text"
                  id="text-input"
                  onChange={getValue}
                  name="cvv_cvc"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
                {errors.cvv_cvc && (
                  <div className="  text    text-red-600">
                    Please enter the card's CVV/CVC
                  </div>
                )}
              </div>
            </div>

            <br></br>
            <div className=" flex-col md:flex-col ">
              <PrimaryBtn btnName="Register" handleClick={handleSubmit} />
            </div>
            <br></br>
            <span className=" mr-3">Already have an account?</span>
            <a href={"/login"} target="_blank" rel="noopener noreferrer">
              {"Login"}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
