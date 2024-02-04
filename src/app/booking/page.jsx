"use client";
import { useState } from "react";

// use secret admin key only
import { supabase } from "@/lib/supabase";
export default function Page() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [pbURL, setpbURL] = useState("");
  const uploadAvatar = async (e) => {
    e.preventDefault();

    const uploadAvatar = avatar[0];
    try {
      //upload avatar
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${username}`, uploadAvatar);
      //get public url
      const url = supabase.storage.from("avatars").getPublicUrl(data.path);
      if (error) {
        return console.error(error);
      }
      return url;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(avatar);
  const handleAvatar = async (e) => {
    const url = await uploadAvatar(e);
    //set pbURL
    console.log(url);
    setpbURL(url.data.publicUrl);
  };

  return (
    <div className="animate-jump-in animate-delay-300 animate-once">
      This is Booking Page
      <input onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="file">
        upload
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar([e.target.files[0]])}
          id="file"
        />
      </label>
      <button onClick={handleAvatar} className="mr-10">
        Upload
      </button>
      <div className="db flex items-center justify-center">
        <img src={pbURL ? pbURL : ""} alt="" />
      </div>
    </div>
  );
}
