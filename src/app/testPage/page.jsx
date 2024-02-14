import Image from "next/legacy/image";
import SuperiorGardenView from "/src/asset/homepage/Superior-Garden-View.jpg";
import Superior from "/src/asset/homepage/Superior.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex max-w-[1980px] w-11/12 flex-col border-4 border-double border-indigo-600 lg:w-5/6">
        <h2 className="py-20">Booking History</h2>
        <div className="flex w-full flex-col border-4 border-double border-indigo-600">
          <div className="flex">
            <div className="flex h-[18rem] w-2/5 border-4 border-double border-indigo-600 relative">
              <Image src={SuperiorGardenView} layout="fill" objectFit="cover" alt="Suite" />
            </div>
            <div className="w-full border-4 border-double border-indigo-600">
              <div className="px-14 flex w-full items-center justify-between border-4 border-double border-indigo-600">
                <h3>Superior Garden View</h3>
                <p>Booking date: Tue, 16 Oct 2022</p>
              </div>
              <div className="px-14 flex w-full border-4 border-double border-indigo-600 py-7">
                <div className="flex flex-col">
                  <p>checkin</p>
                  <p>Th, 19 Oct 2022 | After 2:00 PM</p>
                </div>
                <div className="flex flex-col">
                  <p>checkout</p>
                  <p>Fri, 20 Oct 2022 | Before 12:00 PM</p>
                </div>
              </div>
              <div className="w-full border-4 border-double border-indigo-600">
                <Accordion type="single" collapsible className="bg-[#F1F2F6] w-11/12">
                  <AccordionItem value="item-1">
                    <AccordionTrigger><span className="text-xl">Booking Detail</span></AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-4 border-double border-indigo-600">
            <div>cancel</div>
            <div>room detail</div>
          </div>
        </div>
      </div>
    </div>
  );

export default testPage;
