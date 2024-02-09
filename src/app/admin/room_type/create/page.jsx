"use client";

import React from "react";
import Sidebar from "@/components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";
import { useState } from "react";

const crateRoomType = () => {
  const [values, setValues] = useState({
    mainImage: "",
    name: "",
    pricePerNight: "",
    promotionPrice: "",
    galleryImage: "",
    guest: "",
    bedType: "",
    size: "",
    description: "",
    amenity: [""],
    status: "Vacant",
  });
  const [errors, setErrors] = useState({
    mainImage: false,
    name: false,
    pricePerNight: false,
    promotionPrice: false,
    galleryImage: false,
    guest: false,
    bedType: false,
    size: false,
    description: false,
    amenity: false,
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
      for (let i = 0; i < newImage.length; i++) {
        if (typeof newImage[i] === "object") {
          try {
            const { data, error } = await supabase.storage
              .from("roomGallery")
              .upload(
                `roomGallery/${fileName}/${i}`,
                newImage[i][Object.keys(newImage[i])[0]],
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
          .upload(`mainImage/${fileName}/mainImage`, data);
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
      mainImage: !values.mainImage,
      name: !values.name,
      pricePerNight: !values.pricePerNight,
      galleryImage: values.galleryImage.length < 4,
      guest: !values.guest,
      bedType: !values.bedType,
      size: !values.size,
      description: !values.description,
      amenity: values.amenity.length < 1 || !values.amenity[0],
      promotionPrice: !values.promotionPrice && isPromotion,
    };
    setErrors({ ...newErrors });
    if (Object.values(newErrors).includes(true)) return alert("Form Error");
    alert("Form Submitted");
    const uploadMainImage = await uploadImage(values.mainImage);
    const uploadGalleryImage = await uploadImage(values.galleryImage);
    const newValues = {
      ...values,
      mainImage: uploadMainImage,
      galleryImage: uploadGalleryImage,
    };
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
