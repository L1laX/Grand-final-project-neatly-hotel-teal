import PopupBox from "@/components/common/PopupBox";
import PopupGallery from "@/components/common/PopupGallery";
import PrimaryBtn from "@/components/common/PrimaryBtn";

export const RoomCard = ({
  roomitem,
  roomname,
  roomimage,
  roomguest,
  roomdesc,
  roomprice,
  roomdisc,
}) => {
  // const [showContent, setShowContent] = useState(false);
  // const [showGallery, setShowGallery] = useState(false);

  return (
    <div>
      {/* room card : map ตรงนี้ */}
      <div>
        {roomitem}
        <div className="room-card flex flex-col justify-center gap-12 px-5 py-10 lg:flex-row">
          <div
            className=" h-[320px] w-[413px] cursor-pointer rounded-md bg-slate-200"
            onClick={() => {
              setShowGallery(true);
            }}
          >
            {roomimage}
          </div>
          <section className="room-detail flex flex-col lg:justify-between">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <h4>{roomname}</h4>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  {roomguest}
                </p>
                <p className="font-sans text-base font-normal text-[#646D89]">
                  {roomdesc}
                </p>
              </div>
              <div className=" pt-5 lg:flex lg:w-1/2 lg:flex-col lg:items-end lg:pt-0">
                <p className="text-left font-sans text-base font-normal text-[#646D89] line-through">
                  THB {roomdisc}
                </p>
                <h5>THB {roomprice}</h5>

                <p className="font-sans text-base font-normal text-[#646D89] lg:text-right">
                  Per Night <br /> (Including Taxes & Fees)
                </p>
              </div>
            </div>
            <div className=" flex items-center justify-center gap-5 pt-5 lg:items-center lg:justify-end">
              <p
                className=" visitlink"
                onClick={() => {
                  setShowContent(true);
                }}
              >
                Room Detail
              </p>
              <PrimaryBtn btnName="Book Now" />
            </div>
          </section>
          <hr />
        </div>
      </div>

      {/* Popup Room detail */}
      {/* <PopupBox
        isVisible={showContent}
        onClose={() => {
          setShowContent(false);
        }}
      /> */}

      {/* <PopupGallery
        isGallery={showGallery}
        onCloseGal={() => {
          setShowGallery(false);
        }}
      /> */}

      {/* <h1 className=" text-red-500">rendering_redtext : {roomitem}</h1> */}
    </div>
  );
};
