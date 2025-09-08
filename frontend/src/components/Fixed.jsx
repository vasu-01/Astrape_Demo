import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import { CgShoppingBag } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { BsChatSquareDots } from "react-icons/bs";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Fixed({ user }) {
  const navigate = useNavigate();
  const [avatarImg, setAvatarImg] = useState("");

  // useState(() => {
  //   setAvatarImg(user.user.avatar);
  // }, []);
  const handleClick = () => {
    navigate("/addProduct");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 px-16  z-50 bg-white ">
        <div className="">
          <div className="flex  justify-between items-center mt-10 ">
            {/* first section */}

            <div
              id="logo-section"
              className="flex justify-between w-94 items-center"
            >
              <div id="logo-img">
                <div className="">
                  <img src={"/logo.png"} alt="logo" className="w-32 h-12" />
                </div>
                <div>
                  <p className="text-sm">Buy. Inspect. Deal</p>
                </div>
              </div>

              <div
                id="search-box"
                className="flex items-center bg-white border  rounded-xl  px-3 py-1  ml-5 w-64 h-8 transition border-black"
              >
                {/* Search Icon */}

                <CiSearch />
                {/* Input */}
                <input
                  type="text"
                  placeholder="Taj Garden Retreat, Bengaluru"
                  className="bg-transparent outline-none w-full text-sm "
                />
              </div>
            </div>

            {/* second section */}

            <div
              id="mid-section "
              className="flex justify-between items-center w-200"
            >
              <div
                id="sell-btns"
                className="flex items-center justify-between w-56"
              >
                <div id="sell ">
                  <button
                    onClick={handleClick}
                    className="border-3  border-blue-900  w-16 rounded-xl h-10 flex items-center px-0.5 py-0.5 cursor-pointer"
                  >
                    <FaPlus className="m-1 text-xs  " />
                    <p className="text-sm ">Sell</p>
                  </button>
                </div>
                <div id="one-click-sell ">
                  <button className="border-3 border-blue-900  w-34 rounded-xl h-10 flex items-center px-0.5 py-0.5 cursor-pointer">
                    <LuMousePointerClick className="m-1 text-xs" />
                    <p className="text-sm ">One Click Sell</p>
                  </button>
                </div>
              </div>

              <div id="items " className="text-center">
                <CgShoppingBag className="h-5 w-5 mx-auto cursor-pointer" />
                <p className="text-xs mt-1">Your items</p>
              </div>

              <div id="favourites" className="text-center">
                <button onClick={handleCartClick}>
                  <FaRegHeart className="h-5 w-5 mx-auto cursor-pointer" />
                  <p className="text-xs mt-1">Your Cart</p>
                </button>
              </div>

              <div id="chats" className="text-center">
                <TfiWrite className="h-5 w-5 mx-auto cursor-pointer" />
                <p className="text-xs mt-1">Chat</p>
              </div>

              <div id="blogs" className="text-center ">
                <BsChatSquareDots className="h-5 w-5 mx-auto cursor-pointer" />
                <p className="text-xs mt-1">Blogs</p>
              </div>

              <div id="carrers" className="text-center ">
                <IoTrendingUp className="h-5 w-5 mx-auto cursor-pointer" />
                <p className="text-xs mt-1">Career</p>
              </div>
            </div>

            {/* third section */}
            <div
              id="last-section"
              className="flex justify-between items-center w-24 mr-9.5"
            >
              <div id="notification">
                <MdOutlineNotificationsNone className="h-6 w-6 font-bold cursor-pointer" />
              </div>
              <div id="photo">
                <img
                  // src={user.user.avatar}
                  src="/resume picture.jpg"
                  alt=""
                  className="h-14 w-14 rounded-4xl bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
