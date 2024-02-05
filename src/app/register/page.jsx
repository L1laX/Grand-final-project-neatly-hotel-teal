"use client";

import BgUpload from "@/asset/input/photo.svg";
import bg1 from "@/asset/background/register/bg1.jpg";
import Country from "@/components/common/Country";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabase";
//import Validation from "./registervalidation.js";
const Register = () => {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    password: "",
    dateOfBirth: "",
    email: "",
    image: "",
    id_number: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cardOwner: "",
    cvc_cvv: "",
    role: "user",
  });
  const [errors, setErrors] = useState({
    fullName: false,
    username: false,
    password: false,
    dateOfBirth: false,
    email: false,
    id_number: false,
    country: false,
    cardNumber: false,
    expiryDate: false,
    cardOwner: false,
    cvc_cvv: false,
    image: false,
  });

  const getValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    let displayValue = e.target.value;
    if (e.target.name === "id_number") {
      if (value.length > 13) {
        return;
      }
      const newValue = value.replace(/\D/g, "");
      setValues({ ...values, [e.target.name]: newValue });
      return setIdNumber(newValue);
    }
    if (e.target.name === "cardNumber") {
      // Limit the input to 19 characters
      if (value.length > 19) {
        return;
      }
      // Remove all non-digit characters
      const newValue = value.replace(/\D/g, "");
      // Set the value to database
      setValues({ ...values, [e.target.name]: newValue });
      // Add a space after every 4 digits
      displayValue = newValue.replace(/(\S{4})/g, "$1 ").trim();
      // Set the value to display
      return setCardNumber(displayValue);
    }
    if (e.target.name === "expiryDate") {
      // Limit the input to 19 characters
      if (value.length === 3 && +value > 130) {
        return setErrors({ ...errors, expiryDate: true });
      }
      if (value.length > 5) {
        return;
      }
      // Remove all non-digit characters
      const newValue = value.replace(/\D/g, "");
      // Set the value to database
      setValues({ ...values, [e.target.name]: newValue });
      // Add a space after every 4 digits
      displayValue = newValue.replace(/(\S{2})/g, "$1 ").trim();
      // Set the value to display
      setExpiryDate(displayValue);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file.size <= 10 * 1024 * 1024) {
      const id = Date.now();
      const value = e.target.files[0];
      setAvatar({ ...avatar, [id]: value });
    } else {
      alert("File size should be less than 10MB");
    }
  };

  const handleDeleteAvatar = (e, avatar_id) => {
    e.preventDefault();
    const newAvatar = { ...avatar };
    console.log(avatar_id);
    delete newAvatar[avatar_id];
    setAvatar({ ...newAvatar });
  };
  const uploadAvatar = async (e) => {
    e.preventDefault();
    const avatarindex = Object.keys(avatar);
    const username = values.username;
    const uploadAvatar = avatar[avatarindex];
    console.log(uploadAvatar);
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${username}`, uploadAvatar);
      if (error) {
        return console.error(error);
      }
      const url = supabase.storage.from("avatars").getPublicUrl(data.path);
      return url;
    } catch (error) {
      console.error(error);
    }
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate Email
    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //1st validation
    const errors = {
      fullName: values.fullName.length <= 1,
      username: values.username.length <= 1,
      password: values.password.length <= 12,
      dateOfBirth: validateDateofBirth(values.dateOfBirth),
      email:
        values.email.length === 0 &&
        !values.email.toLowerCase().match(validEmailRegex),
      id_number: values.id_number.length !== 13,
      country: values.country.length < 1,
      cardNumber: values.cardNumber.length !== 16,
      expiryDate: values.expiryDate.length <= 4,
      cardOwner: values.cardOwner.length === 0,
      cvc_cvv: +values.cvc_cvv.length < 3,
      image: Object.keys(avatar).length === 0,
    };
    // next validate
    setErrors({ ...errors });
    if (
      Object.keys(errors).filter((error) => errors[error] === true).length === 0
    ) {
      const {
        data: { publicUrl },
      } = await uploadAvatar(e);
      const sendingData = { ...values, image: publicUrl };
      try {
        const result = await axios.post("/api/register", sendingData);
        if (result.status === 201) {
          router.push("/login");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <div className="flex h-[1500px] w-auto items-center justify-center   md:h-[1777px] md:w-auto">
      <div className=" relative hidden  h-[1777px]    w-auto items-center sm:hidden md:block ">
        <Image src={bg1} alt="background image" />
      </div>
      <form
        className="  absolute h-[1300px] items-center  justify-center rounded  bg-slate-50  p-10 shadow md:h-[1626px]  md:w-[1092px]  "
        onSubmit={handleSubmit}
      >
        <div className=" md:flex-col">
          <h2 className="mb-4 text-start text-[50px] font-bold  md:mb-[50px] md:text-start">
            Register
          </h2>
        </div>
        <div className=" md:flex-col">
          <div className="basic-info ">
            <h4 className="text-start md:mb-[50px] md:text-start">
              Basic Information
            </h4>

            <div className="fullName-section relative ml-2 flex w-fit flex-col gap-2 md:justify-center">
              <label htmlFor="text-input" className="ml-1  text-gray-600">
                Full name
              </label>
              <input
                onChange={getValue}
                name="fullName"
                type="text"
                id="text-input"
                className="mt-1 rounded-md border border-gray-300 p-2 md:mb-[50px]  md:w-[930px]"
                placeholder="Enter text..."
              />
              {errors.fullName && (
                <div className=" absolute bottom-5 text-red-600">
                  Please enter your name
                </div>
              )}
            </div>

            <div className="gap-5  md:flex  md:w-[932px] md:items-center  md:justify-center ">
              <div className="left-section m-3 flex w-full flex-col  md:justify-center ">
                <div className="user-section relative md:justify-center">
                  <label
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
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
                  {errors.username && (
                    <div className=" absolute bottom-5 text-red-600">
                      Please enter your username
                    </div>
                  )}
                </div>
                <div className="password relative">
                  <label
                    htmlFor="text-input"
                    className="text-sm  text-gray-600"
                  >
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
                  {errors.password && (
                    <div className=" absolute bottom-5 text-red-600">
                      Password must be more than 12 characters
                    </div>
                  )}
                </div>
                <div className="Date-section relative">
                  <lable
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
                  >
                    Date of Birth
                  </lable>
                  <input
                    // onChange={getDate}
                    type="date"
                    id="text-input"
                    name="dateOfBirth"
                    onChange={getValue}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                    placeholder="Enter text..."
                  />
                  {errors.dateOfBirth && (
                    <div className=" absolute bottom-5 text-red-600">
                      Your age must not empty and be greater than 18.
                    </div>
                  )}
                </div>
              </div>
              <div className="right-section flex  flex-col ">
                <div className="email-section relative">
                  <lable htmlFor="text-input" className="text-sm text-gray-600">
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
                  {errors.email && (
                    <div className="absolute bottom-5 text-red-600">
                      email is not valid
                    </div>
                  )}
                </div>
                <div className="id-section border-white-500 relative">
                  <lable
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
                  >
                    ID Number
                  </lable>
                  <input
                    value={id_number}
                    type="text"
                    id="text-input"
                    name="id_number"
                    onChange={getValue}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                    placeholder="Enter text..."
                  />
                  {errors.id_number && (
                    <div className=" absolute bottom-5 text-red-600">
                      ID number must be 13 characters
                    </div>
                  )}
                </div>
                <div className="contry-section relative">
                  <lable
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
                  >
                    Country
                  </lable>
                  <Country
                    setCountry={getValue}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                  />
                  {errors.id_number && (
                    <div className=" absolute bottom-5 text-red-600">
                      Please select your country
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-300  shadow-md md:w-[930px] md:border-b-2 md:border-gray-300  md:shadow-md"></div>
          <div className="picture-section my-5">
            <div className="header">
              <h4>Profile Picture</h4>
              <div className="upload-section relative mt-5 flex h-52 gap-10">
                {Object.keys(avatar).length ? (
                  Object.keys(avatar).map((id) => {
                    const file = avatar[id];
                    return (
                      <div
                        key={id}
                        className="image-preview-container relative"
                      >
                        <img
                          className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={100}
                        />
                        <button
                          className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
                          onClick={(event) => handleDeleteAvatar(event, id)}
                        >
                          x
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="image-upload relative">
                    <label>
                      <Image
                        src={BgUpload}
                        alt="background upload"
                        className="cursor-pointer shadow-lg transition-transform hover:scale-110"
                      />
                      <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        placeholder="Enter last name here"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={handleAvatar}
                      />
                    </label>
                    {errors.image && (
                      <div className="absolute bottom-0 w-64 text-red-600">
                        Please upload your profile picture
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-b-2 border-gray-300 shadow-md  md:w-[930px] md:border-b-2 md:border-gray-300 md:shadow-md "></div>

          <div>
            <div className="md:mb-[50px] md:flex-col">
              <h4 className="credit-card-header">Credit Card</h4>
            </div>
            <br></br>
            <div className=" gap-5 md:flex md:w-[932px]  md:items-center md:justify-center  md:justify-items-center ">
              <div className="left-section md:justify-center">
                <div className=" cardnumber-section relative">
                  <lable
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
                  >
                    Card Number
                  </lable>
                  <input
                    // onChange={getCard}
                    type="text"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={getValue}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px] md:w-[446px]"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  {errors.cardNumber && (
                    <div className=" absolute bottom-5 text-red-600">
                      formate Invalid
                    </div>
                  )}
                </div>
                <div className="expiry-date-section relative">
                  <lable
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
                  >
                    Expiry Date
                  </lable>
                  <input
                    // onChange={getExpriry}
                    type="text"
                    id="text-input"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={getValue}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                    placeholder="MM YY"
                  />
                  {errors.expiryDate && (
                    <div className=" absolute bottom-5 text-red-600">
                      formate Invalid
                    </div>
                  )}
                </div>
              </div>
              <div className="right-section">
                <div className="card-owner relative">
                  <lable
                    htmlFor="text-input"
                    className="text-sm font-medium text-gray-600"
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
                    <div className=" absolute bottom-5 text-red-600">
                      formate Invalid
                    </div>
                  )}
                </div>
                <div className="cvc_cvv-context relative">
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
                    inputMode="numeric"
                    name="cvc_cvv"
                    pattern="[0-9]{3}"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 md:mb-[50px]"
                    placeholder="XXX"
                    maxLength={3}
                    minLength={3}
                  />
                  {errors.cvc_cvv && (
                    <div className=" absolute bottom-5 text-red-600">
                      formate Invalid
                    </div>
                  )}
                </div>
              </div>
            </div>

            <br></br>
            <div className=" flex-col md:flex-col ">
              <PrimaryBtn btnName="Register" />
            </div>
            <br></br>
            <span className=" mr-3">Already have an account?</span>
            <Link
              href="/login"
              className="visitlink visitlink:hover visitlink:disabled"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
