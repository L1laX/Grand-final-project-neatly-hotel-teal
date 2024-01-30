export default function RoomDetail() {
  return (
    <main>
      <h1>Room Detail</h1>

      <div className="room-card">
        <img
          className=" shadow-lg"
          src="https://placehold.co/450x320"
          alt="preview-image"
        />
        <div className="room-detail">
          <div>
            <h1>Superior Garden View</h1>
            <span>2 Guests | 2 Double bed | 32 sqm</span>
            <p>
              Rooms (36sqm) with full garden views, 1 single bed, bathroom with
              bathtub & shower.
            </p>
          </div>
          <div>
            <p>THB 3,100.00 เปลี่ยนสีจาก baseได้</p>
            <h2>THB 2,500.00</h2>
            <p>Per Night</p>
            <p>(Including Taxes & Fees)</p>
          </div>
          <div>
            <p className=" visitlink">Room Detail</p>
            <button className=" btn-primary btn-primary:hover btn-primary:visited">
              Book Now
            </button>

            <button className=" btn-secondary ">Book Now</button>
          </div>
          <h4>Status</h4>
          <div>
            <p className="status-green">Vacant</p>
            <p className="status-blue">Occupied</p>
            <p className="status-red">Assign</p>
            <p className="status-yellow">Inspected</p>
            <p className="status-gray">out of Order</p>
          </div>
        </div>
      </div>
    </main>
  );
}
