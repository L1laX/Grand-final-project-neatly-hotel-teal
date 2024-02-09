"use client";
import React, { useEffect } from "react";
import Sidebar from "../../../../components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const data = {
  room_id: 1,
  mainImage: "https://placehold.co/400",
  name: "Deluxe",
  status: "Vacant",
  pricePerNight: "3000",
  promotionPrice: "2500",
  galleryImage: ["https://placehold.co/400", "https://placehold.co/400"],
  guest: "2",
  bedType: "dubleBed",
  size: "32",
  description: "lorem ipsum dolor sit ametsssssssssssssssssssssss",
  amenity: ["wifi", "tv", "kitchen"],
};
const page = ({ params: { room_id } }) => {
  const [values, setValues] = useState({ ...data });

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

  const checkpicture = async (data) => {
    const uploadImage = [];
    const fileName = values.name.toLowerCase().split(" ").join("_");
    if (Array.isArray(data)) {
      const newImage = [...data];
      console.log(newImage);
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
      if (typeof data === "object") {
        console.log("uploading main image");
        console.log(data);
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
          console.log("succsess");
        } catch (error) {
          console.error(error);
        }
      } else {
        uploadImage.push(data);
      }
      return uploadImage;
    }
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
    const uploadGalleryImage = await checkpicture(values.galleryImage);
    const uploadMainImage = await checkpicture(values.mainImage);
    // const sendData = {
    //     ...values,
    //     galleryImage: uploadGalleryImage,
    //     mainImage: uploadMainImage,
    //   };
  };
  return (
    <div>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col">
          <NavBar
            navName={values.name}
            button={true}
            buttonName={"Update"}
            notSearch={true}
            backarrow={true}
            handleSubmit={handleSubmit}
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
          <button
            className="mr-28 w-fit self-end "
            onClick={() => {
              alert("Delete Room");
            }}
          >
            Delete Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
