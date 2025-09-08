import React from "react";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#28313b] h-112 px-16 py-16 text-white">
      <div className="">
        <div className="flex justify-between items-center">
          {/* Address and contacts */}

          <div className=" w-66 h-52">
            <div>
              <h4 className="font-medium text-lg">Address:</h4>
              <p className="text-md">Level 1,12 Sample St, Sydney</p>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-lg">Contact:</h4>
              <div>
                <p className="text-md">+91 123 456 7890</p>
                <p className="text-md">contact@ai.in</p>
              </div>
            </div>

            <div className="flex text-lg mt-8 ">
              <RiFacebookCircleFill />
              <FaInstagram className="mr-2 ml-2" />
              <RiTwitterXLine />
              <FaLinkedin className="mr-2 ml-2" />
              <FaYoutube />
            </div>
          </div>

          {/* Products and  Company */}
          <div className="flex justify-between items-center  w-69 h-46">
            <div>
              <h2 className="font-medium text-xl">Products</h2>
              <div className="list-none mt-5 text-lg text-center">
                <li>Features</li>
                <li className="mt-5 mb-5">Pricing</li>
                <li>Security</li>
              </div>
            </div>

            <div>
              <h2 className="font-medium text-xl">Company</h2>
              <div className="list-none mt-5 text-lg text-center">
                <li className="mt-5 mb-5">About</li>
                <li className="mb-12">Careers</li>
              </div>
            </div>
          </div>

          {/* Company Logo */}
          <div>
            <img src="/logo.png" className="h-31 w-80" alt="" />
          </div>
        </div>
      </div>

      <hr className="mt-25" />

      <credits>
        <div className="flex justify-between items-center mt-10 text-sm">
          <p>2025 ai. All rights reserved.</p>
          <div className="flex justify-between items-center w-100">
            <p>Privacy Policy</p>
            <p>Terms of Services</p>
            <p>Cookies Settings</p>
          </div>
        </div>
      </credits>
    </div>
  );
}
