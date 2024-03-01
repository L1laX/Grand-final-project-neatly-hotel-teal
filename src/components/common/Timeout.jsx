"use client";

import React from "react";
import Modal from "./PopupModal";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
const Timeout = () => {
  let oldCountDown = null;
  React.useEffect(() => {
    oldCountDown = window.localStorage.getItem("countDown");
    if (oldCountDown) {
      oldCountDown = parseInt(oldCountDown);
      setCountDown(oldCountDown);
    }
  }, []);
  const [countDown, setCountDown] = React.useState(60 * 15);
  const [runTimer, setRunTimer] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (runTimer) {
      let timerId;
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [runTimer]);

    window.localStorage.setItem("countDown", countDown);


  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      setShowModal(true);
      setRunTimer(false);
      window.localStorage.removeItem("countDown");
    }
  }, [countDown, runTimer]);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  const handleConfirm = () => {
    router.back();
  };

  return (
    <div>
      <div>
        We Are Holding Your Room :{" "}
        <span className="visitlink cursor-default">
          {minutes}:{seconds}
        </span>
      </div>
      <Modal
        showModal={showModal}
        modalTitle="Timeout"
        modalContent="Please try again later"
        confirmButton="Confirm"
        isCancelHidden={true}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default Timeout;
