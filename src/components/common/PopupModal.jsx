import React from "react";

const Modal = ({
  showModal,
  handleCancel,
  handleConfirm,
  modalTitle,
  modalContent,
  cancelButtonText,
  confirmButtonText,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-8">
        <div>
          <h4>{modalTitle}</h4>
        </div>
        <p className="border"></p>
        <br></br>
        <div>
          <p className="mb-4">{modalContent}</p>
        </div>
        <div className="flex justify-end">
          <button className="btn-secondary mr-4" onClick={handleCancel}>
            {cancelButtonText}
          </button>
          <button className="btn-primary mr-4" onClick={handleConfirm}>
            {confirmButtonText}
          </button>
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
