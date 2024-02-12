"use client";

import StepperController from "@/components/common/StepperController";
import { useEffect, useState } from "react";
import axios from "axios";

const NamTestPage = () => {
  const [dataUser, setDataUser] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(`/api/user/edit_profile/`);
      console.log(response.data);
      setDataUser(response.data);
      console.log(userProfiles);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Test</h1>
      <p>{dataUser.fullName}</p>
    </>
  );
};

export default NamTestPage;
