import React, { useEffect, useState } from "react";
import { IoMdMic } from "react-icons/io";
import Fixed from "../components/Fixed.jsx";
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import RecentSearch from "../components/RecentSearch.jsx";
import CategorySlider from "../components/CategorySlider.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";
import Reviews from "./Reviews";
import Products from "../components/Products.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  newbikeDetail,
  newcarDetail,
  newlistedBike,
  newlistedCar,
  recommendedItem,
  recSearches,
} from "../utils/data.js";

export default function LandingPage() {
  const navigate = useNavigate();

  const recentSearches = recSearches;
  const newlistedBikes = newlistedBike;
  const newlistedCars = newlistedCar;
  // const newcarDetails = newcarDetail;
  // const newbikeDetails = newbikeDetail;
  const recommendedItems = recommendedItem;

  // const [user, setUser] = useState([]);
  const [cars, setCars] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [product, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  const location = useLocation();
  const userdetail = location.state;
  // setUser(userdetail);
  // console.log(userdetail);

  // const response = async ()=>{
  //   await axios.get(`${import.meta.env.VITE_URL}`)
  // }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/home/products`)
      .then((res) => {
        setProducts(res.data);

        const carProducts = res.data.filter((item) => item.category === "Car");
        const bikeProducts = res.data.filter(
          (item) => item.category === "Bike"
        );
        // console.log("car", carProducts);
        // console.log("bike", bikeProducts);

        setCars(carProducts);
        setBikes(bikeProducts);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/product/addToCart`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("cart response:", response);
        alert(response.data.message);
      } else {
        alert(`${response.data.message}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occured!");
      }
    }
  };

  const filteredProducts =
    filter === "All" ? product : product.filter((p) => p.category === filter);

  return (
    <>
      <div>
        {/* first section/navbar section */}

        <div className="">
          <Fixed />
        </div>

        {/* mid section */}

        <div className="px-16 py-5  mt-28">
          <div>
            <div className="bg-[#0668e1] flex justify-between items-center px-12 py-20 rounded-2xl tracking-wide">
              {/* first section */}
              <div className="w-[60%]">
                <p className="text-white font-bold text-[45px]">
                  The Smartest Way to Sell Anything, Instantly.
                </p>
                <div
                  id="search-box"
                  className="flex items-center bg-white mt-5  rounded-4xl  w-3xl h-[65px] px-3 py-1"
                >
                  {/* Search Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Taj Garden Retreat, Bengaluru"
                    className="bg-transparent outline-none w-full text-sm "
                  />
                  <IoMdMic className="cursor-pointer h-6 w-6 " />
                  <HiOutlineCamera className="cursor-pointer h-6 w-6 ml-5 mr-5" />
                  <HiOutlineAdjustmentsHorizontal className="cursor-pointer h-6 w-6" />
                </div>
                <div className="text-white font-semibold text-lg mt-10 ">
                  <div className="text-2xl font-bold">Recent Searches</div>
                  <div className="flex flex-wrap mt-4">
                    {recentSearches.map((search, idx) => (
                      <RecentSearch key={idx} label={search} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <img src="/user_4.png" alt="" />
              </div>
            </div>

            <div className="mt-12">
              {/* Explore Categories */}
              <CategorySlider />

              {/* Banner */}

              <div className="bg-[#0668e1] flex justify-between items-center px-12 py-20 rounded-2xl mt-8 tracking-wide">
                <div className="w-[60%] text-white">
                  <p className=" font-bold text-[45px]">
                    Turn Your Electronics into Earnings - Sell in Just One
                    Click.
                  </p>
                  <p className="text-[25px] tracking-wide">
                    AI-powered smart selling. Fast, Simple, <br />
                    Profitable
                  </p>
                  <div>
                    <button className="h-12 bg-white text-black w-60 rounded-3xl font-bold flex items-center justify-center gap-3 mt-10">
                      Start Sell Now
                      <span>
                        <FaArrowRightLong className="inline-block align-middle " />
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <img src="/user_4.png" alt="" />
                </div>
              </div>

              {/* New listed cars */}

              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-10">Newly listed cars</h2>
                <div className="flex  ">
                  {newlistedCars.map((carsBrand, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl  px-4 py-2 inline-block m-2"
                    >
                      {carsBrand}
                    </div>
                  ))}
                </div>
                <Products details={cars} />
              </div>

              {/* New listed bikes */}

              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-10">
                  Newly listed budget bikes
                </h2>
                <div className="flex  ">
                  {newlistedBikes.map((bikesBrand, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl  px-4 py-2 inline-block m-2"
                    >
                      {bikesBrand}
                    </div>
                  ))}
                </div>

                <Products details={bikes} />
              </div>

              {/* Recommended items */}

              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-10">
                  Recommended For you
                </h2>

                <Products details={recommendedItems} />
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-10">Filter Products</h2>
                <div className="flex justify-start mb-6 ">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-[500px]"
                  >
                    <option value="All">All</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-6 mt-8 cursor-pointer">
                  {filteredProducts.map((cont, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg w-80 h-111 flex  flex-col p-[10px]"
                      onClick={() => navigate(`/product/${cont._id}`)}
                    >
                      <img
                        src={cont.bannerImg}
                        alt=""
                        className="h-[222px]  w-full"
                      />
                      <div className="p-[4px]">
                        <div className=" flex justify-between mt-5 ">
                          <h2 className="text-xl">
                            <b> $ {cont.price.toLocaleString()}</b>
                          </h2>
                          <span>
                            <b>Eco</b>: {cont.eco}/100
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-3 mb-2">
                          {cont.year}
                          {cont.category === "Car" || cont.category === "Bike"
                            ? `-${cont.km}`
                            : ""}
                        </p>
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {cont.name}
                        </p>
                        <div className="text-sm text-gray-500 font-medium flex justify-between">
                          <p className=" ">{cont.location}</p>
                          <span>{cont.date}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(cont._id);
                        }}
                        className="mt-4 cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sell and Buy */}

              <div>
                <p className="text-3xl font-bold mt-10 mb-10">
                  Sell and buy everything with AI
                </p>

                <div className="flex justify-evenly">
                  <div className="  w-95 h-67 ">
                    <div className="justify-items-center">
                      <img
                        src="/moreCategory.svg"
                        alt=""
                        className="h-42 w-42"
                      />
                    </div>
                    <div className="mt-8 text-center leading-[100%] tracking-[4%]">
                      <p>
                        More than 13+ <br /> Categories are in AI
                      </p>
                    </div>
                  </div>

                  <div className=" w-95 h-67">
                    <div className="justify-items-center">
                      <img src="/click.svg" alt="" className="h-42 w-42" />
                    </div>
                    <div className="mt-8 text-center leading-[100%] tracking-[4%]">
                      <p>
                        Sell your unused items in 30 <br /> seconds With One
                        click sell
                      </p>
                    </div>
                  </div>

                  <div className="  w-95 h-67">
                    <div className="justify-items-center">
                      <img src="/share.svg" alt="" className="h-42 w-42" />
                    </div>
                    <div>
                      <p className="mt-8 text-center leading-[100%] tracking-[4%]">
                        Earn upto 1000 in AI credits <br /> by referral
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan expiry */}

              <div className="flex  justify-between bg-[#0668e1] items-center px-10 py-5 rounded-2xl mt-10">
                <div className="w-[60%]">
                  <div className="text-white">
                    <p className=" font-bold text-[45px] leading-25 tracking-wide">
                      Your Plan is About to Expire!
                    </p>
                    <p className="text-[25px] tracking-wide">
                      Renew now to keep listing and boosting your products
                      without interruption
                    </p>
                  </div>
                  <div className="mt-10">
                    <button className="border text-white text-2xl tracking-wide border-white w-50 h-12 rounded-lg px-2 py-0 flex items-center ">
                      Renew Plan
                      <span className="ml-2 text-3xl">
                        <LuMousePointerClick />
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <img src="/expire.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* last section */}
          <div></div>
        </div>

        {/* last section */}

        <div className="bg-[#0668e1] text-white flex justify-center w-377 h-150">
          <div className="m-auto ">
            <img src="/homesweethome.png " className="h-130 w-130" alt="" />
          </div>
          <div className="m-auto p-10">
            <p className=" font-bold text-[45px]  tracking-wide">
              Turn Your Property into Profit-List in Just One Click!
            </p>
            <p className="text-[25px] tracking-wide">
              AI based smart selling. Fast. Efficient.
            </p>
            <p className="font-bold text-xl tracking-wider ">
              #SmartSellRevolution
            </p>
          </div>
        </div>

        <Reviews />

        {/* Footer section */}
        <Footer />
      </div>
    </>
  );
}
