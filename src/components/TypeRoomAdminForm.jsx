import React from "react";

const TypeRoomAdminForm = () => {
  return (
    <sction className="TyperoomForm  m-48 p-20">
      <form className="mx-20 flex flex-col  bg-slate-500 p-11">
        <div className="basic-info flex flex-col gap-5">
          <h5>Basic Information</h5>
          <div className="Roomtype flex w-full flex-col">
            <label htmlFor="roomType">Room Type *</label>
            <input type="text" />
          </div>
          <div className="room-bedType flex gap-8">
            <div className="roomSize flex w-[300px] flex-col">
              <label htmlFor="roomSize">Room size[sqm] *</label>
              <input type="text" name="roomSize" />
            </div>
            <div className="bedType flex w-[300px] flex-col">
              <label htmlFor="bedType">Bed Type *</label>
              <input type="text" name="bedType" />
            </div>
          </div>
          <div className="guests flex w-[300px] flex-col">
            <label htmlFor="guests">Guest(s) *</label>
            <input type="number" name="guests" />
          </div>
          <div className="pricePerNight-promotion flex gap-8">
            <div className="pricePerNight flex flex-col justify-center">
              <label htmlFor="pricePerNight">Price per Night(THB) *</label>
              <input type="number" name="pricePerNight" />
            </div>
            <div className="promotionPrice flex items-end justify-center">
              <input type="checkbox" className="mx-3 h-5 w-5" />
              <label htmlFor="promotionPrice" className="w-[150px] text-sm">
                Promotion Price(THB)
              </label>
              <input type="number" name="promotionPrice" />
            </div>
          </div>
          <div className="discription flex flex-col gap-3">
            <label htmlFor="roomDescription">Room Description *</label>
            <textarea
              name="roomDescription"
              id=""
              cols="30"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="room-image">
          <div className="main-image">
            <label htmlFor="mainImage">
              <input type="file" accept="image/*" />
            </label>
          </div>
        </div>
      </form>
    </sction>
  );
};

export default TypeRoomAdminForm;
