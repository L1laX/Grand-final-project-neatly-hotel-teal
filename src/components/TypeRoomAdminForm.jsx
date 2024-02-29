"use client";
import React, { useRef } from "react";
import UploadPic from "@/asset/input/photo.svg";
import UploadPicSmall from "@/asset/input/uploadSmallPhoto.svg";
import Image from "next/legacy/image";
import DragIcon from "@/asset/input/dragicon.svg";
import SecondaryBtn from "./common/SecondaryBtn";
import { orange } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { Input } from "@/components/ui/input";

const TypeRoomAdminForm = ({
  values,
  setValues,
  handleSubmit,
  errors,
  setDeletedImage,
  deletedImage,
}) => {
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

    if (name === "roomMainImage") {
      setValues({ ...values, roomMainImage: file });
    }

    if (name === "roomGallery") {
      const id = Date.now();
      const value = e.target.files[0];
      setValues({
        ...values,
        roomGallery: [...values.roomGallery, { [id]: value }],
      });
    }
  };

  const handleDeleteImage = (e, id, name, i) => {
    e.preventDefault();
    if (name === "roomMainImage") {
      return setValues({ ...values, roomMainImage: "" });
    }
    if (name === "roomGallery") {
      if (values.roomGallery.length === 1) {
        return setValues({ ...values, roomGallery: [] });
      }
      const newImage = [...values.roomGallery];
      newImage.splice(i, 1);
      deletedImage
        ? setDeletedImage([...deletedImage, values.roomGallery[i]])
        : null;
      return setValues({ ...values, roomGallery: [...newImage] });
    }
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };
  const dragStart = (e) => {
    dragItem.current = e.target.getAttribute("drag_id");
  };
  const dragEnter = (e) => {
    e.preventDefault();
    dragOverItem.current = e.currentTarget.getAttribute("drag_id");
  };

  const drop = (type) => {
    if (type === "image") {
      const newGallery = [...values.roomGallery];
      const dragItemContent = newGallery[dragItem.current];
      newGallery.splice(dragItem.current, 1);
      newGallery.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      return setValues({ ...values, roomGallery: newGallery });
    }
    const newAmenity = [...values.roomAmenity];
    const dragItemContent = newAmenity[dragItem.current];
    newAmenity.splice(dragItem.current, 1);
    newAmenity.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setValues({ ...values, roomAmenity: newAmenity });
  };

  const addAmenity = (e) => {
    e.preventDefault();
    const newAmenity = [...values.roomAmenity];
    newAmenity.push("");
    setValues({ ...values, roomAmenity: newAmenity });
  };
  const deleteAmenity = (e, i) => {
    if (values.roomAmenity.length !== 1) {
      e.preventDefault();
      const newAmenity = [...values.roomAmenity];
      newAmenity.splice(i, 1);
      setValues({ ...values, roomAmenity: newAmenity });
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
          <div className="Roomtype relative flex w-full flex-col">
            <label htmlFor="name">Room Type *</label>
            <Input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-1 outline-none focus:border-orange-500"
              name="name"
              onChange={getValue}
              value={values.name}
            />
            {errors?.name && (
              <div className=" absolute left-44 top-0 text-red-600">
                Please enter room type
              </div>
            )}
          </div>

          <div className="room-bedType flex gap-8">
            <div className="size relative flex w-1/2 flex-col">
              <label htmlFor="size">Room size[sqm] *</label>
              <Input
                type="number"
                name="size"
                className="mt-1 w-full rounded-md border border-gray-300 p-1 outline-none [appearance:textfield] focus:border-orange-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onChange={getValue}
                value={values.size}
                min={1}
              />
              {errors?.size && (
                <div className=" absolute left-44 top-0 text-red-600">
                  Please enter size
                </div>
              )}
            </div>
            <div className="bedType relative flex w-1/2 flex-col">
              <label htmlFor="bedType">Bed Type *</label>
              <select
                name="bedType"
                className="mt-1 w-full rounded-md border border-gray-300 p-1 outline-none hover:border-orange-500 focus:border-orange-500"
                defaultValue=""
                onChange={getValue}
                value={values.bedType}
              >
                <option value="" disabled>
                  bed type
                </option>
                <option value="singleBed"> single bed</option>
                <option value="doubleBed"> double bed</option>
                <option value="doubleBed(kingSize)">
                  double bed(king size)
                </option>
                <option value="twinBed">twin bed</option>
              </select>
              {errors?.bedType && (
                <div className=" absolute left-44 top-0 text-red-600">
                  Please select bed type
                </div>
              )}
            </div>
          </div>
          <div className="guests relative flex w-[300px] flex-col">
            <label htmlFor="guests">Guest(s) *</label>
            <select
              className=" mt-1 w-full rounded-md border border-gray-300 p-1  outline-none hover:border-orange-500 focus:border-orange-500"
              name="guests"
              defaultValue=""
              onChange={getValue}
              value={values.guests}
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
            {errors?.guests && (
              <div className=" absolute left-44 top-0 w-64 text-red-600">
                Please select guest count
              </div>
            )}
          </div>
          <div className="pricePerNight-promotion flex justify-between gap-8">
            <div className="pricePerNight relative flex  w-1/3 flex-col">
              <label htmlFor="pricePerNight">Price per Night(THB) *</label>
              <Input
                type="number"
                name="pricePerNight"
                min={1}
                className="mt-1 w-full rounded-md border border-gray-300 p-1 outline-none [appearance:textfield] focus:border-orange-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onChange={getValue}
                value={values.pricePerNight}
              />
              {errors?.pricePerNight && (
                <div className=" absolute left-44 top-0 w-64 text-red-600">
                  Please enter price per night
                </div>
              )}
            </div>
            <div className="promotionPrice relative mt-5 flex w-1/2 items-center justify-center">
              <Checkbox
                sx={{
                  color: orange[200],
                  "&.Mui-checked": {
                    color: orange[500],
                  },
                }}
                className="mr-1 mt-1"
                checked={values.promotionPrice ? true : false}
                onClick={() => {
                  if (values.promotionPrice) {
                    const newValues = { ...values };
                    delete newValues.promotionPrice;
                    setValues({ ...newValues });
                  }
                  if (!values.promotionPrice) {
                    setValues({ ...values, promotionPrice: " " });
                  }
                }}
              />
              <label htmlFor="promotionPrice" className=" mt-1 w-[450px]">
                Promotion Price (THB)
              </label>
              <Input
                type="number"
                name="promotionPrice"
                min={1}
                className="mt-1 w-full rounded-md border border-gray-300 p-1 outline-none [appearance:textfield] focus:border-orange-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={values.promotionPrice ? values.promotionPrice : " "}
                onChange={getValue}
                disabled={values.promotionPrice ? null : "disabled"}
              />
              {errors.promotionPrice && (
                <div className=" absolute -top-5 right-0 w-64 text-red-600">
                  Please enter promotion price
                </div>
              )}
            </div>
          </div>
          <div className="discription relative flex flex-col gap-3">
            <label htmlFor="description">Room Description *</label>
            <textarea
              name="description"
              className="mt-1 w-full rounded-md border border-gray-300 p-1  outline-none hover:border-orange-500 focus:border-orange-500"
              onChange={getValue}
              cols="30"
              rows="3"
              value={values.description}
            ></textarea>
            {errors?.description && (
              <div className=" absolute left-44 top-0 w-64 text-red-600">
                Please enter price per night
              </div>
            )}
          </div>
        </div>
        <div className="my-10 w-full border-b-2 border-gray-300"></div>
        <div className="room-image">
          <h4>Room Image</h4>
          <div className="main-image relative rounded-full">
            <p className="pb-2 pt-9">Main Image*</p>
            {values.roomMainImage ? (
              <div className="image-preview-container relative w-fit">
                <img
                  className="image-preview border border-amber-500 shadow-lg transition-transform hover:scale-110"
                  src={
                    typeof values.roomMainImage === "object"
                      ? URL.createObjectURL(values.roomMainImage)
                      : values.roomMainImage
                  }
                  alt={"main image"}
                  width={100}
                />
                <button
                  className="image-remove-button absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 p-3 px-3 text-sm text-white outline-none transition-colors hover:bg-orange-500 focus:border-orange-500"
                  onClick={(event) =>
                    handleDeleteImage(event, "", "roomMainImage", "")
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
                  name="roomMainImage"
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleMainImage}
                />
              </label>
            )}
            {errors?.roomMainImage && (
              <div className=" absolute left-32 top-9 w-64 text-red-600">
                Please upload main image
              </div>
            )}
          </div>
          <div className="image-gallery-header relative">
            <p className="pb-2 pt-9">
              Image Gallery(At least 4 pictures) *
              {errors?.roomGallery && (
                <span className="w-64 pl-5 text-red-600">
                  Image gallery must be at least 4 pictures
                </span>
              )}
            </p>
          </div>
          <div
            className="image-gallery preview flex flex-wrap gap-6"
            draggable={true}
            onDragOver={allowDrop}
          >
            {values.roomGallery && !Object.keys(values.roomGallery).length ? (
              <label className="cursor-grab active:cursor-grabbing">
                <Image
                  src={UploadPicSmall}
                  alt="background upload"
                  className="cursor-pointer shadow-lg hover:opacity-95"
                  width={120}
                  height={120}
                />
                <input
                  name="roomGallery"
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleMainImage}
                />
              </label>
            ) : values.roomGallery &&
              Object.keys(values.roomGallery).length < 10 ? (
              Object.keys(values.roomGallery).map((id, i) => {
                const file = values.roomGallery[id];
                if (i === Object.keys(values.roomGallery).length - 1) {
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
                            handleDeleteImage(event, id, "roomGallery", i)
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
                          name="roomGallery"
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
                          handleDeleteImage(event, id, "roomGallery", i)
                        }
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <label className="cursor-grab active:cursor-grabbing">
                <Image
                  src={UploadPicSmall}
                  alt="background upload"
                  className="cursor-pointer shadow-lg hover:opacity-95"
                  width={120}
                  height={120}
                />
                <input
                  name="roomGallery"
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
        <div className="my-10 w-full border-b-2"></div>
        <div className="room-amenity relative">
          <h4>Room Amenities </h4>
          {errors?.roomAmenity && (
            <span className=" absolute left-60 top-3 w-64 text-red-600">
              <p> Please enter at least one amenity</p>
            </span>
          )}
          <div
            className="amenity-list cursor-grab active:cursor-grabbing"
            draggable={true}
            onDragOver={allowDrop}
          >
            {values.roomAmenity &&
              values.roomAmenity.length &&
              values.roomAmenity.map((item, i) => {
                return (
                  <div
                    className="item flex w-full cursor-grab p-4 active:cursor-grabbing"
                    key={i}
                    onDragStart={dragStart}
                    onDragEnter={dragEnter}
                    onDragEnd={drop}
                    drag_id={i}
                    draggable={true}
                  >
                    <div
                      className="icon cursor-grab active:cursor-grabbing"
                      drag_id={i}
                      draggable
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
                        className="mt-1 w-full rounded-lg border p-2  outline-none hover:border-orange-500 focus:border-orange-500"
                        onChange={(e) => {
                          const value = e.target.value;
                          const newAmenity = [...values.roomAmenity];
                          newAmenity.splice(i, 1, value);
                          setValues({ ...values, roomAmenity: newAmenity });
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
