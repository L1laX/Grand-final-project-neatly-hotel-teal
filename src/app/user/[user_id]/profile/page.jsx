"use client";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import BgUpload from "@/asset/input/photo.svg";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import DatePicker from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Country from "@/components/common/Country";
import { useSearchParams } from "next/navigation";

export default function UserProfile() {
  const [avatar, setAvatar] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    id_number: "",
    dateOfBirth: "",
    country: "",
  });
  // const searchParams = useSearchParams();
  // const user_id = searchParams.get("user_id");

  // fetching data
  const getUserProfile = async () => {
    try {
      const response = await axios.get(`/api/user/edit_profile/`);
      console.log(response.data.user);
      setUserProfiles(response.data.user);
      console.log(userProfiles);
    } catch (error) {
      console.log("Fetching data failed...", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfiles((prevData) => ({ ...prevData, [name]: value }));
  };

  // updated data
  const updatedProfile = async () => {
    try {
      const response = await axios.put(`/api/user/edit_profile/`, {
        userProfiles,
      });
      console.log(response.data);
      setUserProfiles(response.data);
      console.log(userProfiles);
    } catch (error) {
      console.log("Fetching data failed...", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatedProfile(userProfiles);
    // back to {/User}
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
      //upload to storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${username}`, uploadAvatar);
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
                  value=""
                  placeholder={userProfiles.fullName}
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
                    value=""
                    placeholder=""
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
                    value=""
                    placeholder=""
                  />
                </label>
              </div>
              <div className="dateOfBirth-container grid grid-cols-2 gap-4">
                <label htmlFor="dateOfBirth">
                  Date of Birth
                  <DatePicker selected="" onSelect={handleChange} />
                </label>
              </div>
              <div className="country-container">
                <label htmlFor="Country">
                  Country
                  <Country setCountry={handleChange} />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Image Uploading */}
        <div className="image-uploading">
          <h5 className="my-5 text-[#9AA1B9]">Profile Picture</h5>
          <div className="upload-section relative mt-5 flex h-52 gap-10">
            {Object.keys(avatar).length ? (
              Object.keys(avatar).map((id) => {
                const file = avatar[id];
                return (
                  <div key={id} className="image-preview-container relative">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
