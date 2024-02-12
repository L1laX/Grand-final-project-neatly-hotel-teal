"use client";

import React from "react";
import Sidebar from "@/components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const crateRoomType = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    roomMainImage: "",
    name: "",
    pricePerNight: "",
    promotionPrice: "",
    galleryImage: [],
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
    galleryImage: false,
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
    const fileName = values.name.toLowerCase().split(" ").join("_");
    if (Array.isArray(data)) {
      const newImage = [...data];
      for (let i = 0; i < newImage.length; i++) {
        if (typeof newImage[i] === "object") {
          try {
            const { data, error } = await supabase.storage
              .from("roomGallery")
              .update(
                `roomGallery/${fileName}/${i}`,
                newImage[i][Object.keys(newImage[i])[0]],
                { upsert: true },
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
      try {
        const image = await supabase.storage
          .from("mainImage")
          .update(`mainImage/${fileName}/mainImage`, data, { upsert: true });
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
    const newErrors = {
      mainImage: !values.roomMainImage,
      name: !values.name,
      pricePerNight: !values.pricePerNight,
      galleryImage: values.galleryImage.length < 4,
      guests: !values.guests,
      bedType: !values.bedType,
      size: !values.size,
      description: !values.description,
      roomAmenity: values.roomAmenity.length < 1 || !values.roomAmenity[0],
      promotionPrice: !values.promotionPrice && isPromotion,
    };
    setErrors({ ...newErrors });
    if (Object.values(newErrors).includes(true)) return alert("Form Error");
    alert("Form Submitted");
    const uploadMainImage = await uploadImage(values.roomMainImage);
    const uploadGalleryImage = await uploadImage(values.galleryImage);
    const newValues = {
      ...values,
      roomMainImage: uploadMainImage[0],
      galleryImage: uploadGalleryImage,
    };
    const res = await axios.post("/api/admin/room_prop", newValues);
    if (res.status === 200) {
      alert("Form Submitted");
      return router.push("/admin/room_type");
    }
    alert;
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
    </div>
  );
};

export default crateRoomType;
