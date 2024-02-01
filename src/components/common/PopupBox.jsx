import Image from "next/legacy/image";
import CloseIcon from "@/asset/icons/close-outline.svg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PopupBox({ isVisible, onClose }) {
  if (!isVisible) {
    return null;
  }
  return (
    <>
      <div className=" popup-bg fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-25 backdrop-blur-sm">
        <div className="popup-content flex items-center justify-center bg-white">
          <div className="h-[577px] w-[450px] divide-y-2 divide-gray-300 overflow-auto rounded border border-gray-300 p-4 md:w-[800px]">
            <div className=" flex flex-row justify-between gap-5 p-4 md:ml-20">
              <h5>Superior Garden View</h5>
              <Image
                className=" cursor-pointer"
                src={CloseIcon}
                width={20}
                height={20}
                onClick={() => onClose()}
              />
            </div>
            <div className="content p-4 md:mx-20">
              {/* Carousel */}
              <div className=" px-5 md:px-0">
                <Carousel>
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="content-detail divide-y-2 divide-gray-300 p-4">
                <div className=" py-5">
                  <p className="font-sans text-base font-normal text-[#646D89]">
                    2 Guests | 2 Double bed | 32 sqm
                  </p>
                  <p className="font-sans text-base font-normal text-[#646D89]">
                    Rooms (36sqm) with full garden views, 1 single bed, bathroom
                    with bathtub & shower. 555
                  </p>
                </div>
                <div className=" py-5">
                  <p>Room Amenities</p>
                  <div className="flex flex-col justify-between gap-6 p-4 md:flex-row">
                    <ul className="amenities-1 list-disc">
                      <li className="bullet-text">Safe in Room</li>
                      <li className="bullet-text">Air Conditioning</li>
                      <li className="bullet-text">
                        High speed internet connection
                      </li>
                      <li className="bullet-text">Hairdryer</li>
                      <li className="bullet-text">Shower</li>
                      <li className="bullet-text">Bathroom amenities</li>
                      <li className="bullet-text">Lamp</li>
                    </ul>
                    <ul className="amenities-2 list-disc">
                      <li className="bullet-text">Minibar</li>
                      <li className="bullet-text">Telephone</li>
                      <li className="bullet-text">Ironing board</li>
                      <li className="bullet-text">
                        A floor only accessible via a guest room key
                      </li>
                      <li className="bullet-text">Alarm clock</li>
                      <li className="bullet-text">Bathrobe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
