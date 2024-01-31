import Image from "next/legacy/image";
import FacebookLightIcon from "@/asset/social/facebook-circle-light.svg";
import InstagramLightIcon from "@/asset/social/instagram-light.svg";
import TwitterLightIcon from "@/asset/social/twitter-light.svg";
import NeatlyLightLogo from "@/asset/logo/logo-light.svg";
import TelephoneGreen from "@/asset/icons/telephone-green.svg";
import EmailGreen from "@/asset/icons/email-green.svg";
import PinGreen from "@/asset/icons/pin-green.svg";

const UserFooter = () => {
  return (
    <section className="footer-background bg-[#2F3E35] md:h-[485px]">
      {/* UserFooter : LOGO */}
      <div className=" divide-y-2 divide-slate-300 pt-16">
        <div className="footer-content mb-20 flex flex-col justify-between p-5 md:mx-20 md:flex-row">
          <div className="">
            <Image src={NeatlyLightLogo} />
            <h5 className=" text-white">Neatly Hotel</h5>
            <p className=" py-4 text-base font-normal text-white">
              The best hotel for rising your experience
            </p>
          </div>
          {/* Contact List */}
          <div className=" mt-10 md:mt-0">
            <h5 className=" text-white">Contact</h5>
            <div className=" py-4 text-white">
              <Image src={TelephoneGreen} />
              <span className=" pl-4">+66 99 999 9999</span>
            </div>
            <div className=" py-4 text-white">
              <Image src={EmailGreen} />
              <span className=" pl-4">contact@neatlyhotel.com</span>
            </div>
            <div className=" py-4 text-white">
              <Image src={PinGreen} />
              <span className=" pl-4">
                188 Phaya Thai Rd, Thung Phaya Thai, Ratchathewi, Bangkok 10400
              </span>
            </div>
          </div>
        </div>
        {/* Social Icon */}
        <div className="footer-social mx-5 flex justify-between py-10 md:mx-20">
          <div className=" gap-3">
            <Image src={FacebookLightIcon} width={24} height={24} />
            <Image src={InstagramLightIcon} width={24} height={24} />
            <Image src={TwitterLightIcon} width={24} height={24} />
          </div>
          <p className=" text-sm font-normal text-white">
            Copyright ©2022 Neatly Hotel
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserFooter;
