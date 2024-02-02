"use client";

import bg1 from "@/asset/background/register/bg1.jpg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Image from "next/image";
import { useEffect, useState } from "react";
//import Validation from "./registervalidation.js";
const Register = () => {
  const signUp = async (data) => {
    const result = await axios.post("/api/login", data);
    if (result.data.staus === 200) {
      router.push("/");
    }
  };
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
  const getValue = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.fullname.length) {
      setErrors({ fullname: true });
    } else {
      setErrors({ fullname: false });
    }

    if (!values.username.length) {
      setErrors({ username: true });
    } else {
      setErrors({ username: false });
    }
    return await signUp(values);
  };

  return (
    <div className="flex h-[1500px] w-auto items-center justify-center   md:h-[1777px] md:w-auto">
      <div className="  relative hidden  h-[1777px]    w-auto items-center sm:hidden md:block ">
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
              required
              onChange={getValue}
              name="fullname"
              type="text"
              id="text-input"
              className=" md:  mt-1  rounded-md border border-gray-300 p-2 md:mb-[50px]  md:w-[930px]"
              placeholder="Enter text..."
            />
            {errors.fullname && (
              <span className="text-danger">เหยดแม่มกรอกใหม่ที</span>
            )}
          </div>
          <div className="  gap-5   md:flex md:w-[932px]  md:items-center md:justify-center md:justify-between md:justify-items-center  ">
            <div className="md:justify-center">
              <label
                htmlFor="text-input"
                class="text-sm font-medium text-gray-600"
              >
                UserName
              </label>
              <input
                // onChange={getUserName}
                type="text"
                onChange={getValue}
                id="text-input"
                name="username"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                placeholder="Enter text..."
              />

              <label for="text-input" class="text-sm font-medium text-gray-600">
                password
              </label>
              <input
                // onChange={getPassword}
                type="text"
                id="text-input"
                onChange={getValue}
                name="password"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                placeholder="Enter text..."
              />

              <lable for="text-input" class="text-sm font-medium text-gray-600">
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
            </div>
            <div>
              <lable for="text-input" class="text-sm font-medium text-gray-600">
                Email
              </lable>
              <input
                // onChange={getEmail}
                type="text"
                id="text-input"
                name="email"
                onChange={getValue}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                placeholder="Enter text..."
              />

              <lable for="text-input" class="text-sm font-medium text-gray-600">
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

              <lable for="text-input" class="text-sm font-medium text-gray-600">
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
                  for="text-input"
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

                <lable
                  for="text-input"
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
              </div>
              <div>
                <lable
                  for="text-input"
                  class="text-sm font-medium text-gray-600"
                >
                  Card Owner
                </lable>
                <input
                  // onChange={getCardOwner}
                  type="text"
                  id="text-input"
                  onChange={getValue}
                  name="cardOwne"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                  placeholder="Enter text..."
                />

                <lable
                  for="text-input"
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
              </div>
            </div>

            <br></br>
            <div className=" flex-col md:flex-col ">
              <PrimaryBtn btnName="Register" handleClick={handleSubmit} />
            </div>
            <br></br>
            <span className=" mr-3">Already have an account?</span>
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Login"}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
