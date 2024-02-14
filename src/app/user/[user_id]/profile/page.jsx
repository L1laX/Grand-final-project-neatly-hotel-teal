"use client";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import UploadPic from "@/asset/input/photo.svg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Country from "@/components/common/Country";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/common/DatePicker";

export default function UserProfile({ params: { user_id } }) {
  const router = useRouter();
  const [userProfiles, setUserProfiles] = useState("");
  const [oldAvatar, setOldAvatar] = useState("");
  // fetching data

  const getImagePath = (name) => {
    const publicIndex = name.split("/").findIndex((el) => el === "public");
    const data = name
      .split("/")
      .filter((el, i) => {
        if (i > publicIndex + 1) {
          return el;
        }
      })
      .join("/");
    return data;
  };
  const getUserProfile = async () => {
    try {
      const response = await axios.get(`/api/user/edit_profile/${user_id}`);
      // console.log(response.data);

      const {
        fullName,
        id_number,
        dateOfBirth,
        country,
        user: { email, image },
      } = response.data.data;
      setUserProfiles({
        fullName,
        id_number,
        dateOfBirth,
        country,
        email,
        image,
      });
      setOldAvatar(image);

    } catch (error) {
      console.log("Fetching API failed...", error);
    }
  };
  const handleMainImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.size >= 10 * 1024 * 1024) {
      return alert("File size should be less than 10MB");
    }
    return setUserProfiles({ ...userProfiles, image: file });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfiles((prevData) => ({ ...prevData, [name]: value }));
  };
  const getCountry = (value) => {
    setUserProfiles({ ...userProfiles, country: value });
  };

  // updated data
  const updatedProfile = async () => {
    try {
      const response = await axios.put(`/api/user/edit_profile/${user_id}`, {
        ...userProfiles,
      });

      setUserProfiles(response.data);
    } catch (error) {
      console.log("Fetching data failed...", error);
    }
  };
  console.log(userProfiles);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //uploadAvatar image
    if (typeof userProfiles.image === "object") {
      const url = await uploadAvatar();
      console.log(url.data.publicUrl);
      const sendData = { ...userProfiles, image: url.data.publicUrl };
      // sendadata to backend
      const result = await axios.put(
        `/api/user/edit_profile/${user_id}`,
        sendData,
      );
      return router.refresh();
    }
    //if not update image
    const result = await axios.put(
      `/api/user/edit_profile/${user_id}`,
      userProfiles,
    );
    return router.refresh();
    // userProfiles คือ state (เก็บค่าที่ GET และ onChange)
    // updatedProfile(userProfiles);
    //updatedProfile();
  };

  const handleDeleteAvatar = (e) => {
    e.preventDefault();
    setUserProfiles({ ...userProfiles, image: "" });
  };

  const uploadAvatar = async () => {
    const fileName = getImagePath(oldAvatar);
    try {
      //upload to storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .update(fileName, userProfiles.image, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) {
        return console.error(error);
      }
      //get public url
      const url = supabase.storage.from("avatars").getPublicUrl(data.path);
      return url;
    } catch (error) {
      console.error(error);
    }
  };
  const getdateOfBirth = (date) => {
    const value = new Date(date?.$d).toISOString();
    setUserProfiles({ ...userProfiles, dateOfBirth: value });
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <form className=" mx-8 my-10 md:mx-64 md:my-20 ">
      <div className="form-container mb-14 flex flex-col divide-y-2">
        {/* Submit Update */}

        <div className="user-profile-head flex items-center justify-between">
          <h2>Profile</h2>
          <PrimaryBtn btnName="Update Profile" handleClick={handleSubmit} />
        </div>
        <div className="user-profile-form items-center">
          <h5 className="my-5 text-[#9AA1B9]">Basic Information</h5>
          {/* Form Input */}
          <div className="form-container-section-1 my-10 flex flex-col gap-3 ">
            <div className="fullname-container grid grid-cols-1 gap-4">
              <label htmlFor="fullname">
                Fullname
                <Input
                  className="grid outline-none"
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  value={userProfiles?.fullName}
                  placeholder={userProfiles?.fullName}
                />
                <p className=" text-red-500">Fullname cannot be empty</p>
              </label>
            </div>

            <div className="form-container-section-2 grid gap-4 md:grid-cols-2">
              <div className=" email-container">
                <label htmlFor="email">
                  Email
                  <Input
                    className="grid outline-none"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={userProfiles?.email}
                    placeholder={userProfiles?.email}
                  />
                  <p className=" text-red-500">cannot be empty</p>
                </label>
              </div>
              <div className=" idnumber-container">
                <label htmlFor="id_number">
                  ID Number
                  <Input
                    className="grid outline-none"
                    type="text"
                    name="id_number"
                    onChange={handleChange}
                    value={userProfiles?.id_number}
                    placeholder={userProfiles?.id_number}
                  />
                </label>
              </div>
              <div className="dateOfBirth-container grid grid-cols-2 gap-4">
                <label htmlFor="dateOfBirth">
                  <DatePicker
                    value={userProfiles?.dateOfBirth}
                    getdateOfBirth={getdateOfBirth}
                  />
                </label>
              </div>
              <div className="country-container">
                <label htmlFor="Country">
                  Country
                  <Country
                    className="mt-1 h-[55px] w-full rounded-md border border-gray-300 p-2 md:mb-[47px] md:w-[446px]"
                    value={userProfiles?.country}
                    setCountry={getCountry}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Image Uploading */}
        <div className="image-uploading">
          <h5 className="my-5 text-[#9AA1B9]">Profile Picture</h5>
          <div className="upload-section relative mt-5 flex h-52 gap-10">
            {userProfiles.image ? (
              <div className="image-preview-container relative w-fit">
                <img
                  className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                  src={
                    typeof userProfiles.image === "object"
                      ? URL.createObjectURL(userProfiles.image)
                      : userProfiles.image
                  }
                  alt={"main image"}
                  width={100}
                />
                <button
                  className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
                  onClick={(event) => handleDeleteAvatar(event)}
                >
                  x
                </button>
              </div>
            ) : (
              <label>
                <Image
                  src={UploadPic}
                  alt="background upload"
                  className="t cursor-pointer shadow-lg hover:opacity-95"
                />
                <input
                  name="roomMainImage"
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleMainImage}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}