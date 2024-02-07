import React from "react";

const TypeRoomAdminForm = () => {
  return (
    <sction className="TyperoomForm  m-48 p-20">
      <form className="mx-20 flex flex-col  bg-slate-500 p-11">
        <div className="basic-info flex flex-col gap-5">
          <h4>Basic Information</h4>
          <div className="Roomtype flex w-full flex-col">
            <label htmlFor="roomType">Room Type *</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
            />
          </div>
          <div className="room-bedType flex gap-8">
            <div className="roomSize flex w-1/2 flex-col">
              <label htmlFor="roomSize">Room size[sqm] *</label>
              <input
                type="text"
                name="roomSize"
                className="mt-1 w-full rounded-md border border-gray-300 p-1 "
              />
            </div>
            <div className="bedType flex w-1/2 flex-col">
              <label htmlFor="bedType">Bed Type *</label>
              <select
                name="bedType"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
                defaultValue=""
              >
                <option value="" disabled>
                  bed type
                </option>
                <option value="singleBed"> single bed</option>
                <option value="dubleBed"> duble bed</option>
                <option value="dubleBed(kingSize)">duble bed(king size)</option>
                <option value="twinBed">twin bed</option>
              </select>
            </div>
          </div>
          <div className="guests flex w-[300px] flex-col">
            <label htmlFor="guests">Guest(s) *</label>
            <select
              className="mt-1 w-full rounded-md border border-gray-300 p-1"
              name="guests"
              defaultValue=""
            >
              <option value="" disabled>
                guests count
              </option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
              <option value="6">6 guests</option>
            </select>
          </div>
          <div className="pricePerNight-promotion flex justify-between gap-8">
            <div className="pricePerNight flex w-1/3  flex-col ">
              <label htmlFor="pricePerNight">Price per Night(THB) *</label>
              <input
                type="number"
                name="pricePerNight"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
              />
            </div>
            <div className="promotionPrice mt-5 flex w-1/2 items-center justify-center">
              <input type="checkbox" className="mx-3 h-7 w-7" />
              <label htmlFor="promotionPrice" className=" mr-10 w-[300px] ">
                Promotion Price(THB)
              </label>
              <input
                type="number"
                name="promotionPrice"
                className="mt-1 w-full rounded-md border border-gray-300 p-1"
              />
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
          <h4>Room Image</h4>
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
