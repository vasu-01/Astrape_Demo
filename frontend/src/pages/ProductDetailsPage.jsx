import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import Fixed from "../components/Fixed";
import Products from "../components/Products";
import Footer from "../components/Footer";

import {
  pagerecommendedItem,
  newcarDetail,
  newbikeDetail,
} from "../utils/data";
import { CiHeart } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/home/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        // Assuming your API returns product data directly
        const prod = response.data;
        setProduct(prod);
        if (prod.galleryImg && prod.galleryImg.length > 0) {
          setActiveImg(prod.galleryImg[0]);
        } else if (prod.bannerImg) {
          setActiveImg(prod.bannerImg);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-xl">Loading...</p>;

  return (
    <>
      <div className="px-16 py-10 mt-20">
        <div>
          <Fixed />
        </div>

        <div className="">
          {" "}
          <div className="flex gap-12">
            {/* Left - Images */}
            <div className="flex flex-col w-300">
              <img
                src={activeImg}
                alt={product.name}
                className="w-[600px] h-[520px] rounded-xl object-cover border"
              />

              {/* Gallery */}
              <div className="flex gap-3 mt-4">
                {product.galleryImg?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="gallery"
                    className={`w-24 h-20 object-cover rounded-md cursor-pointer border 
                ${activeImg === img ? "border-blue-600" : "border-gray-300"}`}
                    onClick={() => setActiveImg(img)}
                  />
                ))}
              </div>
            </div>

            {/* Mid - icons */}
            <div>
              <div>
                <div className="h-14 w-14  mt-2 rounded-xl bg-gray-300 px-3 py-3">
                  <CiHeart className="h-7 w-7 " />
                </div>
                <div className="h-14 w-14  mt-6 rounded-xl bg-gray-300 px-3 py-3">
                  <IoShareSocialOutline className="h-7 w-7 " />
                </div>
              </div>
              <div className="mt-55">
                <div className="h-14 w-14   rounded-xl bg-gray-300 px-3 py-3">
                  <IoIosArrowBack className="h-7 w-7 " />
                </div>
                <div className="h-14 w-14  mt-6  rounded-xl bg-gray-300 px-3 py-3">
                  <IoIosArrowForward className="h-7 w-7 " />
                </div>
              </div>
            </div>

            {/* Right - Info */}
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h1 className="text-3xl font-bold ">{product.name}</h1>
                <p className="text-gray-500">By {product.ownerName}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-gray-800">
                  ₹ {product.price.toLocaleString()}
                </p>
                {product.oldPrice && (
                  <span className="line-through text-gray-400">
                    {/* ₹ {product.oldPrice.toLocaleString()} */}₹ 98,000
                  </span>
                )}
                <span className="ml-auto  bg-green-100px-3 py-1 rounded-lg text-sm font-medium">
                  <span className="text-lg">Eco</span>: {product.eco}/100
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700 flex ">
                  <MdDateRange className="mt-0 h-5 w-5" />{" "}
                  <span className="ml-1 text-md">{product.date}</span>
                </p>
                <p className="flex items-center text-gray-600 gap-2">
                  <IoLocationOutline className="text-lg" />
                  {product.location}
                </p>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-semibold text-xl mb-2">
                  Product Description
                </h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-semibold text-xl mb-2">Key Features</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {product.features?.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Seller */}
              <div>
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-semibold text-xl mt-5">
                      Product Seller
                    </h2>
                    <div className="flex items-center gap-3 mt-0  pt-0">
                      <div className=" ">
                        <img
                          src="/user_2.jpeg"
                          alt=""
                          className="h-20 w-20  rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold flex text-lg">
                          Geolife pvt{" "}
                          <span className="ml-3">
                            <FaCheckCircle className="text-blue-600 text-xl" />
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          ⭐{/* {product.seller?.rating} */}
                          <span className="ml-1"> 4.8</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="ml-auto px-5 py-2 mt-20 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                      View Seller
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New listed product  */}
        {/* <div className="mt-8">
        <h2 className="text-3xl font-bold mb-10">
          New Listed {product.category}s
        </h2>
        {product.category === "Car" ? (
          <Products details={newcarDetail} />
        ) : (
          <Products details={newbikeDetail} />
        )}
      </div> */}

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-10">Recommended For you</h2>

          <Products details={pagerecommendedItem} />
        </div>
        {/* Main container */}
      </div>
      <Footer />
    </>
  );
}
