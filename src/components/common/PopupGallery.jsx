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

export default function PopupGallery({ isGallery, onCloseGal }) {
  if (!isGallery) {
    return null;
  }
  return (
    <>
      <div className=" popup-bg fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-25 backdrop-blur-sm">
        <div className="popup-content flex items-center justify-center bg-white">
          <div className=" w-[450px] divide-y-2 divide-gray-300 overflow-auto rounded border border-gray-300 p-4 md:w-[800px]">
            <div className=" flex flex-row justify-between gap-5 p-4 md:ml-20">
              <h5>Full Screen เดี๊ยวมาจัดการเรื่องimage</h5>
              <Image
                className=" cursor-pointer"
                src={CloseIcon}
                width={20}
                height={20}
                onClick={() => onCloseGal()}
              />
            </div>
            <div className="content p-4 md:mx-20">
              {/* Carousel แบบ fullscreen */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
