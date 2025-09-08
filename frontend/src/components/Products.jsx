import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products({ details }) {
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      // console.log("productId:", productId);

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
        // console.log("response::", response);

        alert(response.data.message);
      } else {
        alert(`${res.data.message}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occured!");
      }
    }
  };
  return (
    <div>
      {details.length === 0 ? (
        <p className="text-gray-600 text-xl font-medium text-center mt-5">
          No products yet. Add product to see here.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-8 cursor-pointer">
          {details.map((cont, idx) => (
            <div
              key={idx}
              className="border rounded-lg w-80 h-111 flex  flex-col p-[10px]"
              onClick={() => navigate(`/product/${cont._id}`)}
            >
              <img src={cont.bannerImg} alt="" className="h-[222px]  w-full" />
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
      )}
    </div>
  );
}
