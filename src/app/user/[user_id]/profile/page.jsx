"use client";
import { useEffect, useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import DatePicker from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";

import axios from "axios";
import Country from "@/components/common/Country";

export default function UserProfile() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [idenNumber, setIdenNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventdefault();
    updateProfile(room_id, { fullname, email, idnum, bddate, country });
    getRoomData(setData);
    // back to {/User}
  };

  const handleFileChange = (e) => {
    const uniqueId = Date.now();
  };

  const getRoomData = async (input_data) => {
    try {
      const response = await axios.get("/api/room");
      console.log(response.data.data);
    } catch (error) {
      console.log("GET data failed...");
    }
  };

  const getRoomId = async (room_id) => {
    try {
      const response = await axios.get("/api/room/room_id");
      console.log(response.data.data);
    } catch (error) {
      console.log("GET data failed...");
    }
  };

  const updateProfile = async (room_id, data) => {
    try {
      const response = await axios.put("/api/updateprofile/id", data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Update data failed...");
    }
  };

  // useEffect(() => {
  //   getRoomId(room_id);
  // }, []);

  useEffect(() => {
    if (data) {
      setFullname("fullname");
      setEmail("email");
      setIdenNumber("identitynum");
      setBirthDate("birthdatenum");
      setCountry("country");
    }
  }, [data]);

  return (
    <section className=" mx-8 my-10 md:mx-64 md:my-20 ">
      <div className=" mb-14 flex flex-col divide-y-2">
        <div className="user-profile-head flex items-center justify-between">
          <h2>Profile</h2>
          <PrimaryBtn btnName="Update Profile" handleClick={handleSubmit} />
        </div>
        <div className="user-profile-form items-center">
          <h5 className="text-[#9AA1B9]">Basic Information</h5>
          <form className="my-10 flex flex-col gap-3 ">
            <div className=" grid grid-cols-1 gap-4">
              <label htmlFor="fullname">
                Fullname
                <Input
                  className="grid outline-none"
                  type="text"
                  name="fullname"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  value={fullname}
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label htmlFor="email">
                Email
                <Input
                  className="grid outline-none"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </label>
              <label htmlFor="identitynumber">
                ID Number
                <Input
                  className="grid outline-none"
                  type="text"
                  name="identitynumber"
                  onChange={(e) => {
                    setIdenNumber(e.target.value);
                  }}
                  value={idenNumber}
                />
              </label>
              <label htmlFor="dateofbirth">
                Date of Birth
                <DatePicker selected={setBirthDate} onSelect={birthDate} />
              </label>
              <label htmlFor="Country">
                <Country />
              </label>
            </div>
          </form>
        </div>
        <div className="image-uploading"></div>
      </div>
    </section>
  );
}
