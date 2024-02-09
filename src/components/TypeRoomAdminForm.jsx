"use client";
import React, { useRef } from "react";
import UploadPic from "@/asset/input/photo.svg";
import UploadPicSmall from "@/asset/input/uploadSmallPhoto.svg";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import DragIcon from "@/asset/input/dragicon.svg";
import SecondaryBtn from "./common/SecondaryBtn";
import { orange } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const TypeRoomAdminForm = ({ values, setValues, handleSubmit }) => {
  const [isPromotion, setIsPromotion] = useState(
    values.promotionPrice ? true : false,
  );

  const dragItem = useRef();
  const dragOverItem = useRef();
  const getValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleMainImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const name = e.target.name;
    if (file.size >= 10 * 1024 * 1024) {
      return alert("File size should be less than 10MB");
    }

    if (name === "mainImage") {
      setValues({ ...values, mainImage: file });
    }

    if (name === "imageGallery") {
      const id = Date.now();
      const value = e.target.files[0];
      setValues({
        ...values,
        galleryImage: [...values.galleryImage, { [id]: value }],
      });
    }
  };

  const handleDeleteImage = (e, id, name, i) => {
    e.preventDefault();
    if (name === "mainImage") {
      return setValues({ ...values, mainImage: "" });
    }
    if (name === "imageGallery") {
      if (values.galleryImage.length === 1) {
        return setValues({ ...values, galleryImage: [] });
      }
      const newImage = [...values.galleryImage];
      newImage.splice(i, 1);
      return setValues({ ...values, galleryImage: [...newImage] });
    }
  };
  const dragStart = (e) => {
    dragItem.current = e.target.getAttribute("drag_id");
  };
  const dragEnter = (e) => {
    dragOverItem.current = e.currentTarget.getAttribute("drag_id");
  };
  
  const drop = (type) => {
    if (type === "image") {
      const newGallery = [...values.galleryImage];
      const dragItemContent = newGallery[dragItem.current];
      newGallery.splice(dragItem.current, 1);
      newGallery.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      return setValues({ ...values, galleryImage: newGallery });
    }
    const newAmenity = [...values.amenity];
    const dragItemContent = newAmenity[dragItem.current];
    newAmenity.splice(dragItem.current, 1);
    newAmenity.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setValues({ ...values, amenity: newAmenity });
  };

  const addAmenity = (e) => {
    e.preventDefault();
    const newAmenity = [...values.amenity];
    console.log(newAmenity);
    newAmenity.push("");
    setValues({ ...values, amenity: newAmenity });
  };
  const deleteAmenity = (e, i) => {
    if (values.amenity.length !== 1) {
      e.preventDefault();
      const newAmenity = [...values.amenity];
      newAmenity.splice(i, 1);
      setValues({ ...values, amenity: newAmenity });
    }
  };

  return (
    <sction className="TyperoomForm  m-48 p-20">
      <form
        className="mx-20 flex flex-col  bg-white p-11"
        onSubmit={handleSubmit}
      >
        <div className="basic-info flex flex-col gap-5">
          <h4>Basic Information</h4>
          <div className="Roomtype flex w-full flex-col">
            <label htmlFor="name">Room Type *</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
              name="name"
              onChange={getValue}
              value={values.name}
            />
          </div>
          <div className="room-bedType flex gap-8">
            <div className="size flex w-1/2 flex-col">
              <label htmlFor="size">Room size[sqm] *</label>
              <input
                type="text"
                name="size"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
                onChange={getValue}
                value={values.size}
              />
            </div>
            <div className="bedType flex w-1/2 flex-col">
              <label htmlFor="bedType">Bed Type *</label>
              <select
                name="bedType"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
                defaultValue=""
                onChange={getValue}
                value={values.bedType}
              >
                <option value="" disabled>
                  bed type
                </option>
                <option value="singleBed"> single bed</option>
                <option value="dubleBed"> duble bed</option>
                <option value="dubleBed(kingSize)">duble bed(king size)</option>
                <option value="twinBed">twin bed</option>
              </select>
            </div>
          </div>
          <div className="guest flex w-[300px] flex-col">
            <label htmlFor="guest">Guest(s) *</label>
            <select
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
              name="guest"
              defaultValue=""
              onChange={getValue}
              value={values.guest}
            >
              <option value="" disabled>
                guests count
              </option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
              <option value="6">6 guests</option>
            </select>
          </div>
          <div className="pricePerNight-promotion flex justify-between gap-8">
            <div className="pricePerNight flex w-1/3  flex-col ">
              <label htmlFor="pricePerNight">Price per Night(THB) *</label>
              <input
                type="number"
                name="pricePerNight"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
                onChange={getValue}
                value={values.pricePerNight}
              />
            </div>
            <div className="promotionPrice mt-5 flex w-1/2 items-center justify-center">
              <Checkbox
                sx={{
                  color: orange[200],
                  "&.Mui-checked": {
                    color: orange[500],
                  },
                }}
                className="mr-1 mt-1"
                checked={isPromotion ? true : false}
                onClick={() => {
                  setIsPromotion(!isPromotion);
                  if (isPromotion) {
                    const newValues = { ...values };
                    delete newValues.promotionPrice;
                    setValues(newValues);
                  }
                }}
              />

              <label htmlFor="promotionPrice" className=" mt-1 w-[450px]">
                Promotion Price (THB)
              </label>
              <input
                type="text"
                name="promotionPrice"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
                value={!isPromotion ? "" : values.promotionPrice}
                onChange={getValue}
                disabled={isPromotion ? null : "disabled"}
              />
            </div>
          </div>
          <div className="discription flex flex-col gap-3">
            <label htmlFor="roomDescription">Room Description *</label>
            <textarea
              name="description"
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
              onChange={getValue}
              cols="30"
              rows="3"
              value={values.description}
            ></textarea>
          </div>
        </div>
        <div className="my-10 w-full border-b-2 border-gray-300"></div>
        <div className="room-image">
          <h4>Room Image</h4>
          <div className="main-image rounded-full">
            <p className="pb-2 pt-9">Main Image*</p>
            {values.mainImage ? (
              <div className="image-preview-container relative w-fit">
                <img
                  className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                  src={
                    typeof values.mainImage === "object"
                      ? URL.createObjectURL(values.mainImage)
                      : values.mainImage
                  }
                  alt={"main image"}
                  width={100}
                />
                <button
                  className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
                  onClick={(event) =>
                    handleDeleteImage(event, "", "mainImage", "")
                  }
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
                  name="mainImage"
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleMainImage}
                />
              </label>
            )}
          </div>
          <p className="pb-2 pt-9">Image Gallery(At least 4 pictures)*</p>
          <div className="image-gallery preview flex flex-wrap gap-6 ">
            {!Object.keys(values.galleryImage).length ? (
              <label className="cursor-grab active:cursor-grabbing">
                <Image
                  src={UploadPicSmall}
                  alt="background upload"
                  className="cursor-pointer shadow-lg hover:opacity-95"
                  width={120}
                  height={120}
                />
                <input
                  name="imageGallery"
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleMainImage}
                />
              </label>
            ) : Object.keys(values.galleryImage).length < 10 ? (
              Object.keys(values.galleryImage).map((id, i) => {
                const file = values.galleryImage[id];
                if (i === Object.keys(values.galleryImage).length - 1) {
                  return (
                    <div key={id} className="flex gap-5">
                      <div
                        className="image-preview-container relative w-fit cursor-grab active:cursor-grabbing"
                        onDragStart={dragStart}
                        onDragEnter={dragEnter}
                        onDragEnd={() => drop("image")}
                        drag_id={i}
                      >
                        <img
                          className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                          src={
                            typeof file === "object"
                              ? URL.createObjectURL(file[Object.keys(file)[0]])
                              : file
                          }
                          alt={"gallery image"}
                          width={100}
                          drag_id={i}
                        />
                        <button
                          className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
                          onClick={(event) =>
                            handleDeleteImage(event, id, "imageGallery", i)
                          }
                        >
                          x
                        </button>
                      </div>
                      <label className="">
                        <Image
                          src={UploadPicSmall}
                          alt="background upload"
                          className="cursor-pointer shadow-lg hover:opacity-95"
                          width={120}
                          height={120}
                        />
                        <input
                          name="imageGallery"
                          type="file"
                          hidden
                          accept="image/*"
                          multiple
                          onChange={handleMainImage}
                        />
                      </label>
                    </div>
                  );
                }
                return (
                  <div key={id}>
                    <div
                      key={id}
                      className="image-preview-container relative w-fit cursor-grab active:cursor-grabbing"
                      onDragStart={dragStart}
                      onDragEnter={dragEnter}
                      onDragEnd={() => drop("image")}
                      drag_id={i}
                    >
                      <img
                        className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                        src={
                          typeof file === "object"
                            ? URL.createObjectURL(file[Object.keys(file)[0]])
                            : file
                        }
                        drag_id={i}
                        alt={"gallery image"}
                        width={100}
                      />
                      <button
                        className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white transition-colors hover:bg-orange-500"
                        onClick={(event) =>
                          handleDeleteImage(event, id, "imageGallery", i)
                        }
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="my-10 w-full border-b-2"></div>
        <div className="room-amenity">
          <h4>Room Amenities</h4>
          <div className="amenity-list cursor-grab active:cursor-grabbing">
            {values.amenity.length &&
              values.amenity.map((item, i) => {
                return (
                  <div
                    className="item flex w-full cursor-grab p-4 active:cursor-grabbing"
                    draggable
                    key={i}
                    onDragStart={dragStart}
                    onDragEnter={dragEnter}
                    onDragEnd={drop}
                    drag_id={i}
                  >
                    <div
                      className="icon cursor-grab active:cursor-grabbing"
                      drag_id={i}
                    >
                      <Image
                        src={DragIcon}
                        alt="drag icon"
                        drag_id={i}
                        className="cursor-grab active:cursor-grabbing"
                      />
                    </div>
                    <div className="input mx-4 w-full" drag_id={i}>
                      <h5>Amenitiy {i === 0 ? "*" : ""}</h5>
                      <input
                        type="text"
                        value={item}
                        className="mt-1 w-full rounded-lg border p-2"
                        onChange={(e) => {
                          const value = e.target.value;
                          const newAmenity = [...values.amenity];
                          newAmenity.splice(i, 1, value);
                          setValues({ ...values, amenity: newAmenity });
                        }}
                      />
                    </div>
                    <span
                      className="delete-button mt-3 cursor-pointer"
                      drag_id={i}
                      onClick={(e) => deleteAmenity(e, i)}
                    >
                      Delete
                    </span>
                  </div>
                );
              })}
            <SecondaryBtn
              secondaryButton={"mt-5"}
              btnName={"Add Amenity"}
              handleClick={(e) => addAmenity(e)}
            />
          </div>
        </div>
      </form>
    </sction>
  );
};

export default TypeRoomAdminForm;
