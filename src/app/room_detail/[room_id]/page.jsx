//// edit it
"use client";
export default function RoomDetailById({ params }) {
  return (
    <main>
      <div className=" bg-black xl:bg-red-500">
        <h1>Room Detail By Id No.{params.room_id}</h1>
      </div>
    </main>
  );
}
