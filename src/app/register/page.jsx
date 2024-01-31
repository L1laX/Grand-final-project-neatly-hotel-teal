"use client";
import bg1 from "@/asset/background/register/bg1.jpg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Image from "next/image";
import { useEffect, useState } from "react";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expriry, setExpriry] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [cvcCvv, setCvcCvv] = useState("");

  function getFullName(e) {
    setFullName(e.target.value);
    console.log(fullName);
  }
  function getUserName(e) {
    setUserName(e.target.value);
    console.log(userName);
  }
  function getPassword(e) {
    setPassword(e.target.value);
    console.log(passWord);
  }
  function getDate(e) {
    setDate(e.target.value);
    console.log(date);
  }

  function getEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }

  function getEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }

  function getIdNumber(e) {
    setIdNumber(e.target.value);
    console.log(idNumber);
  }

  function getCountry(e) {
    setCountry(e.target.value);
    console.log(country);
  }

  function getCard(e) {
    setCardNumber(e.target.value);
    console.log(cardNumber);
  }

  function getExpriry(e) {
    setExpriry(e.target.value);
    console.log(expriry);
  }

  function getCardOwner(e) {
    setCardOwner(e.target.value);
    console.log(cardOwner);
  }
  function getCvcCvv(e) {
    setCvcCvv(e.target.value);
    console.log(cvcCvv);
  }

  return (
    <div className="flex h-[1500px] w-auto items-center justify-center   md:h-[1777px] md:w-auto">
      <div className="relative  h-[1777px]    w-auto ">
        <Image src={bg1} layout="" />
      </div>
      <from className="  absolute h-[1300px] items-center  justify-center rounded  bg-slate-50  p-10 shadow md:h-[1626px]  md:w-[1092px]  ">
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
            <h1 for="text-input" class=" text-sm font-medium text-gray-600">
              FullName
            </h1>
            <input
              onChange={getFullName}
              type="text"
              id="text-input"
              name="text-input"
              class=" md:  mt-1  rounded-md border border-gray-300 p-2 md:mb-[50px]  md:w-[930px]"
              placeholder="Enter text..."
            />
          </div>
          <div className="  gap-5   md:flex md:w-[932px]  md:items-center md:justify-center md:justify-between md:justify-items-center  ">
            <div className="md:justify-center">
              <h1 for="text-input" class="text-sm font-medium text-gray-600">
                UserName
              </h1>
              <input
                onChange={getUserName}
                type="text"
                id="text-input"
                name="text-input"
                class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                placeholder="Enter text..."
              />

              <h1 for="text-input" class="text-sm font-medium text-gray-600">
                password
              </h1>
              <input
                onChange={getPassword}
                type="text"
                id="text-input"
                name="text-input"
                class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                placeholder="Enter text..."
              />

              <h1 for="text-input" class="text-sm font-medium text-gray-600">
                Date of Birth
              </h1>
              <input
                onChange={getDate}
                type="date"
                id="text-input"
                name="text-input"
                class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                placeholder="Enter text..."
              />
            </div>
            <div>
              <h1 for="text-input" class="text-sm font-medium text-gray-600">
                Email
              </h1>
              <input
                onChange={getEmail}
                type="text"
                id="text-input"
                name="text-input"
                class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                placeholder="Enter text..."
              />

              <h1 for="text-input" class="text-sm font-medium text-gray-600">
                ID Number
              </h1>
              <input
                onChange={getIdNumber}
                type="text"
                id="text-input"
                name="text-input"
                class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                placeholder="Enter text..."
              />

              <h1 for="text-input" class="text-sm font-medium text-gray-600">
                Country
              </h1>
              <input
                onChange={getCountry}
                type="text"
                id="text-input"
                name="text-input"
                class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
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
                <h1 for="text-input" class="text-sm font-medium text-gray-600">
                  Card Number
                </h1>
                <input
                  onChange={getCard}
                  type="text"
                  id="text-input"
                  name="text-input"
                  class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                  placeholder="Enter text..."
                />

                <h1 for="text-input" class="text-sm font-medium text-gray-600">
                  Expiry Date
                </h1>
                <input
                  onChange={getExpriry}
                  type="text"
                  id="text-input"
                  name="text-input"
                  class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
              </div>
              <div>
                <h1 for="text-input" class="text-sm font-medium text-gray-600">
                  Card Owner
                </h1>
                <input
                  onChange={getCardOwner}
                  type="text"
                  id="text-input"
                  name="text-input"
                  class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                  placeholder="Enter text..."
                />

                <h1 for="text-input" class="text-sm font-medium text-gray-600">
                  CVC/CVV
                </h1>
                <input
                  onChange={getCvcCvv}
                  type="text"
                  id="text-input"
                  name="text-input"
                  class="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                  placeholder="Enter text..."
                />
              </div>
            </div>

            <br></br>
            <div className=" flex-col md:flex-col ">
              <PrimaryBtn btnName="Register" />
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
      </from>
    </div>
  );
};

export default Register;
