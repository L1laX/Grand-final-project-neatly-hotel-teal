"use client";
import React from "react";
import Sidebar from "@/components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const crateRoomType = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    roomMainImage: "",
    name: "",
    pricePerNight: "",
    promotionPrice: "",
    roomGallery: [],
    guests: "",
    bedType: "",
    size: "",
    description: "",
    roomAmenity: [""],
    status: "Vacant",
  });
  const [errors, setErrors] = useState({
    roomMainImage: false,
    name: false,
    pricePerNight: false,
    promotionPrice: false,
    roomGallery: false,
    guests: false,
    bedType: false,
    size: false,
    description: false,
    roomAmenity: false,
    status: false,
    promotionPrice: false,
  });
  const [isPromotion, setIsPromotion] = useState(
    values.promotionPrice ? true : false,
  );
  const uploadImage = async (data) => {
    const uploadImage = [];
    const folderName = uuidv4();
    if (Array.isArray(data)) {
      const newImage = [...data];
      for (let i = 0; i < newImage.length; i++) {
        if (typeof newImage[i] === "object") {
          const fileName = uuidv4();
          try {
            const { data, error } = await supabase.storage
              .from("roomGallery")
              .upload(
                `roomGallery/${folderName}/${fileName}`,
                newImage[i][Object.keys(newImage[i])[0]],
                { cacheControl: "0", upsert: true },
              );
            if (error) {
              return console.error(error);
            }
            const url = supabase.storage
              .from("roomGallery")
              .getPublicUrl(data.path);
            uploadImage.push(url.data.publicUrl);
          } catch (error) {
            console.error(error);
          }
        } else {
          uploadImage.push(newImage[i]);
        }
      }
      return uploadImage;
    } else {
      const fileName = uuidv4();
      try {
        const image = await supabase.storage
          .from("mainImage")
          .upload(`mainImage/${folderName}/${fileName}`, data);
        if (image?.error) {
          return console.error(image.error);
        }
        const url = supabase.storage
          .from("mainImage")
          .getPublicUrl(image.data.path);
        uploadImage.push(url.data.publicUrl);
      } catch (error) {
        console.error(error);
      }
    }
    return uploadImage;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Checking Data...");
    const newErrors = {
      mainImage: !values.roomMainImage,
      name: !values.name,
      pricePerNight: !values.pricePerNight,
      roomGallery: values.roomGallery.length < 4,
      guests: !values.guests,
      bedType: !values.bedType,
      size: !values.size,
      description: !values.description,
      roomAmenity: values.roomAmenity.length < 1 || !values.roomAmenity[0],
      promotionPrice: !values.promotionPrice && isPromotion,
    };
    setErrors({ ...newErrors });
    if (Object.values(newErrors).includes(true))
      return toast.update(id, {
        render: "Please fill in all the required fields",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    toast.update(id, {
      render: "Creating Room ...",
      isLoading: true,
      autoClose: 1000,
    });
    const uploadMainImage = await uploadImage(values.roomMainImage);
    const uploadGalleryImage = await uploadImage(values.roomGallery);
    const newValues = {
      ...values,
      roomMainImage: uploadMainImage[0],
      roomGallery: uploadGalleryImage,
    };

    const res = await axios.post("/api/admin/room_prop", newValues);
    if (res.status === 200) {
      toast.update(id, {
        render: "Room Created",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setTimeout(() => {
        router.push("/admin/room_type");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar setActive={4} />
      <div className="flex w-full flex-col">
        <NavBar
          navName={"Room & Property"}
          button={true}
          handleSubmit={handleSubmit}
          buttonName={"+Create Room"}
          notSearch={true}
          backarrow={true}
          linkTo={`/admin/room_type/`}
        />
        <section className="form h-full w-full ">
          <TypeRoomAdminForm
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit}
            errors={errors}
            isPromotion={isPromotion}
            setIsPromotion={setIsPromotion}
          />
        </section>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default crateRoomType;
