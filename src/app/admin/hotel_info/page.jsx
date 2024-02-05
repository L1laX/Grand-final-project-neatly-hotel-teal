"use client";

import { supabase } from "../../../utils/supabase.js";

import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/page";

import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

const HotelInfo = () => {
  const [image, setImage] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelLogoPreview, setHotelLogoPreview] = useState(null);
  const [, setApiData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchHotelInfo();
  }, []);

  const fetchHotelInfo = async () => {
    try {
      const { data, error } = await supabase.from("hotelInfo").select("*");

      if (error) {
        console.error("Error fetching Hotel Information:", error);
      } else {
        setApiData(data);
      }
    } catch (error) {
      console.error("Error fetching Hotel Information:", error);
    }
  };

  const handleDeleteLogoPreview = () => {
    setHotelLogoPreview(null);
    setImage(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const input = e.target;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const value = input.value;
      const newValue = value.substring(0, start) + "\n" + value.substring(end);
      setHotelDescription(newValue);
      input.selectionStart = input.selectionEnd = start + 1;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelDescription", hotelDescription);

    if (image) {
      formData.set("image", image, image.name);
    }

    try {
      const { data, error } = await supabase.from("hotelInfo").insert([
        {
          hotelName: formData.get("hotelName"),
          hotelDescription: formData.get("hotelDescription"),
          image: formData.get("image"),
        },
      ]);

      if (error) {
        console.error("Error submitting hotel information:", error);
      } else {
        console.log("Hotel information submitted successfully");
      }

      router.push("/api/admin/hotel_info");
    } catch (error) {
      console.error("Error submitting hotel information:", error);
    }
  };

  const handleHotelNameChange = (e) => {
    setHotelName(e.target.value);
  };

  const handleHotelDescriptionChange = (e) => {
    setHotelDescription(e.target.value);
  };

  const handleHotelLogoPreviewChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotelLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar />

      <div className="flex w-full flex-col">
        <header className="flex gap-4 border-b border-solid border-b-[color:var(--gray-300,#E4E6ED)] bg-white px-16 py-4 font-semibold max-md:flex-wrap max-md:px-5">
          <h1 className="my-auto grow text-xl stacked-fractions leading-8 tracking-tight text-slate-800 max-md:max-w-full">
            Hotel Information
          </h1>
          <button
            onClick={handleSubmit}
            className="btn-primary btn-primary:hover btn-primary:active btn-primary:disabled justify-center whitespace-nowrap rounded bg-orange-700 px-8 py-4 text-base leading-4 text-white max-md:px-5"
          >
            Update
          </button>
        </header>
        <div className="room-type-table mr-7 mt-6 flex items-center justify-center">
          <Paper
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            className="ml-10"
          >
            <form>
              <div className="flex flex-col rounded border border-solid border-[color:var(--gray-300,#E4E6ED)] bg-white px-20 py-11 max-md:max-w-full max-md:px-5">
                <label className="max-md:max-w-full">Hotel name *</label>
                <input
                  type="text"
                  placeholder="Neatly Hotel"
                  value={hotelName}
                  onChange={handleHotelNameChange}
                  className="mt-1 justify-center rounded border border-solid border-[color:var(--gray-400,#D6D9E4)] bg-white p-3 text-black max-md:max-w-full"
                />
                <label className="mt-10 max-md:max-w-full">
                  Hotel description *
                </label>
                <textarea
                  placeholder="Hotel description"
                  value={hotelDescription}
                  onChange={handleHotelDescriptionChange}
                  onKeyDown={handleKeyDown}
                  className="mt-1 rounded border border-solid border-[color:var(--gray-400,#D6D9E4)] bg-white p-3 pb-12 pr-16 text-black max-md:max-w-full"
                />
                <label className="mt-10 max-md:max-w-full">Hotel logo *</label>{" "}
                <div className="relative">
                  <label
                    htmlFor="image-upload"
                    className="block h-[167px] w-[167px] cursor-pointer rounded border-2 border-dashed border-gray-300 p-4 text-center"
                  >
                    {hotelLogoPreview && (
                      <div>
                        <div
                          className="absolute right-0 top-0 cursor-pointer"
                          onClick={handleDeleteLogoPreview}
                        >
                          <div className="black rounded-full border bg-gray-200">
                            <CloseIcon />
                          </div>
                        </div>
                        <img
                          src={hotelLogoPreview}
                          alt="Hotel logo preview"
                          className="mx-auto mb-4 h-[90px] w-[90px]"
                        />
                        <div>
                          <p>Click to change logo</p>
                        </div>
                      </div>
                    )}
                    {!hotelLogoPreview && (
                      <div>
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleHotelLogoPreviewChange}
                          className="hidden"
                        />
                        <div>
                          <p>Click to add a logo</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
