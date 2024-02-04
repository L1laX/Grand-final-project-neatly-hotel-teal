"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/page";
import NavBarAdmin3 from "@/components/navbar_admin3/navbar3";
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
    // Fetch API data here
    // Example:
    fetch("https://api/hotel_info")
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.log(error));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hotelName: hotelName,
      hotelDescription: hotelDescription,
      hotelLogo: image,
    };
    console.log(data);
    router.push("/admin/hotel_info");
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
    }
  };

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar />

      <div className="flex w-full flex-col">
        <NavBarAdmin3 navName="Hotel Information" />
        <div className="room-type-table mr-7 mt-6 flex items-center justify-center">
          <Paper
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            className="ml-10"
          >
            <form onSubmit={handleSubmit}>
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
                          alt="Uploaded Preview"
                          className="block h-[100px] w-[100px] cursor-pointer rounded   border-gray-300  "
                        />
                      </div>
                    )}
                    Click to Upload Image
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleHotelLogoPreviewChange}
                      className="hidden"
                    />
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
