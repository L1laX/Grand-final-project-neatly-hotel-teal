"use client";
import React, { useEffect } from "react";
import Sidebar from "../../../../components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import TypeRoomAdminForm from "@/components/TypeRoomAdminForm";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const page = ({ params: { room_id } }) => {
  const router = useRouter();
  const [values, setValues] = useState({});
  const [oldGallery, setOldGallery] = useState([]);
  const [oldMainImage, setOldMainImage] = useState({});
  const [isPromotion, setIsPromotion] = useState(
    values.promotionPrice ? true : false,
  );
  const [errors, setErrors] = useState({
    roomMainImage: false,
    name: false,
    pricePerNight: false,
    promotionPrice: false,
    roomGallery: false,
    guest: false,
    bedType: false,
    size: false,
    description: false,
    roomAmenity: false,
    status: false,
  });

  const fileNames = (i) => {
    const item = i ? oldGallery[i] + "" : oldMainImage + "";
    const publicIndex = item.split("/").findIndex((el) => el === "public");
    const data = item
      .split("/")
      .filter((el, i) => {
        if (i > publicIndex + 1) {
          return el;
        }
      })
      .join("/");
    return data;
  };

  const checkpicture = async (data) => {
    const uploadImage = [];
    if (Array.isArray(data)) {
      const newImage = [...data];
      for (let i = 0; i < newImage.length; i++) {
        if (typeof newImage[i] === "object") {
          const fileName = oldGallery[i] ? fileNames(i) : uuidv4();
          try {
            oldGallery[i]
              ? await supabase.storage.from("roomGallery").remove([fileName])
              : null;
            const { data, error } = await supabase.storage
              .from("roomGallery")
              .upload(fileName, newImage[i][Object.keys(newImage[i])[0]], {
                cacheControl: "3600",
                upsert: true,
              });
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
      //main image
      if (typeof data === "object") {
        const fileName = fileNames();
        try {
          const deleteImage = await supabase.storage
            .from("mainImage")
            .remove([fileName]);
          const image = await supabase.storage
            .from("mainImage")
            .upload(fileName, data, { cacheControl: "3600", upsert: true });
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
      } else {
        uploadImage.push(data);
      }
      return uploadImage;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      roomMainImage: !values.roomMainImage,
      name: !values.name,
      pricePerNight: !values.pricePerNight,
      roomGallery: values.roomGallery.length < 4,
      guests: !values.guests,
      bedType: !values.bedType,
      size: !values.size,
      description: !values.description,
      roomAmenity: values.roomAmenity.length < 1 || !values.roomAmenity[0],
    };
    setErrors({ ...newErrors });
    if (Object.values(newErrors).includes(true)) return alert("Form Error");
    alert("Form Submitted");
    console.log(1);
    const sendData = {
      ...values,
      roomGallery: await checkpicture(values.roomGallery),
      roomMainImage: await checkpicture(values.roomMainImage)[0],
    };
    console.log(sendData);
    const result = await axios.put(`/api/admin/room_prop/${room_id}`, sendData);
    if (result.status === 200) {
      alert("Data Updated");
      router.push("/admin/room_type");
    }
  };

  const deleteRoom = async (id) => {
    try {
      alert("Are you sure you want to delete this room?");
      const result = await axios.delete(`/api/admin/room_prop/${id}`);
      if (result.status === 200) {
        alert("Room Deleted");
        router.push("/admin/room_type");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const result = await axios.get(`/api/admin/room_prop/${room_id}`);
      const data = result.data;
      setValues(data.data);
      setOldGallery(data.data.roomGallery);
      setOldMainImage(data.data.roomMainImage);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
            linkTo={`/admin/room_type/`}
            handleSubmit={handleSubmit}
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
              deleteRoom(room_id);
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
