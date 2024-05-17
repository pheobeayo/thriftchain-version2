import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div
      className="px-[30px] md:px-[100px] py-[60px]
    bg-[#060E37] grid grid-cols-1 md:flex md:flex-row gap-4"
    >
      <div className="md:flex flex-wrap md:flex-row justify-between w-full">
        <div className="md:w-[519px] pb-[60px] md:h-[88px] my-[40px]  md:mt-[20px]">
          <div className="flex flex-row items-center gap-4">
            <Link to="/">
              {" "}
              <img src={logo} alt="logo" />{" "}
            </Link>
          </div>

          <p className="text-opacity-90 py-[15px] text-white text-[10px] md:text-[18px]/[26px] font-normal">
            Unlocking Financial Futures, One Goal at a Time
          </p>
          <div className="flex flex-row cursor-pointer space-x-5 text-white">
            <a
              href="https://twitter.com/ThriftChain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-name "
            >
              {" "}
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61554276696134&mibextid=gik2fB"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-name "
            >
              {" "}
              <FaFacebook />
            </a>

            <a
              href="https://www.linkedin.com/company/thriftchain/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-name "
            >
              {" "}
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="md:flex justify-center items-start md:gap-[180px]">
          <div className="flex flex-row gap-[100px]">
            <div className="pt-[20px] sm:pt-0 flex flex-col gap-15">
              <p className="text-gray-50 text-[15px] md:text-[20px] font-semibold">
                <Link>About us </Link>
              </p>
            </div>

            <div className="pt-[20px] sm:pt-0 flex flex-col gap-15">
              <p className="text-gray-50 text-[15px] md:text-[20px] font-semibold">
                Join the waitlist
              </p>
            </div>
          </div>

          <div className="pt-[20px] sm:pt-0 flex flex-col gap-15">
            <p className="text-gray-50 text-[15px] md:text-[20px] font-semibold">
              FAQs
            </p>
          </div>
        </div>
        <div className="pt-[20px] sm:pt-0 flex flex-col gap-7 mt-2">
          <p className="text-gray-50 text-[15px] md:text-[20px] font-semibold">
            Copyright 2023 -ThriftChain. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
