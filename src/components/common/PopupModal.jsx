import React from "react";
import { IoClose } from "react-icons/io5";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";

const Modal = ({
  showModal,
  handleCancel,
  handleConfirm,
  modalTitle,
  modalContent,
  cancelButton,
  confirmButton,
  isCancelHidden,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-6 md:w-[631px]">
        <div className="head-text flex flex-row justify-between py-4">
          <h4 className=" ">{modalTitle}</h4>
          <button
            className={`${isCancelHidden ? "hidden" : null}`}
            onClick={handleCancel}
          >
            <IoClose />
          </button>
        </div>

        <hr />
        <div className="description py-4">
          <p className="body1 text-[#646d89]">{modalContent}</p>
        </div>
        <div className="my-6 flex justify-end gap-5">
          <div className={`${isCancelHidden ? "hidden" : null}`}>
            <SecondaryBtn
              btnName={`${cancelButton}`}
              handleClick={handleCancel}
            ></SecondaryBtn>
          </div>
          <PrimaryBtn
            btnName={`${confirmButton}`}
            handleClick={handleConfirm}
          ></PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

// ประกาศมาใช้คู่กันคับ
// const [showModal, setShowModal] = useState(false);

//   const handleConfirmChangeDate = () => {
//     setShowModal(true);
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//   };

// ตัวอย่างเอาไปใส่
// <Modal
//         showModal={showModal}
//         handleCancel={handleCancel}
//         handleConfirm={handleCancel} //แก้ใส่ลิ้งไปต่่่อ
//         modalTitle=""
//         modalContent=""
//         cancelButtonText="cancle"
//         confirmButtonText="Confirm"
//       />

export default Modal;
