import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/home/products`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, []);
  console.log("product page", details.bannerImg);

  return (
    <div>
      {details.length === 0 ? (
        <p className=" flex justify-center items-center text-2xl text-gray-700 font-medium mt-10">
          Product not added yet!
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-8">
          {details.map((cont, idx) => (
            <div className="border rounded-lg w-80 h-111 flex  flex-col p-[10px]">
              <img
                src={`${import.meta.env.VITE_URL}/uploads/${cont.bannerImg}`}
                alt=""
                className="h-70  w-full"
              />
              <div className="p-[4px]">
                <div className=" flex justify-between mt-5 ">
                  <h2 className="text-xl">
                    <b> {cont.price}</b>
                  </h2>
                  <span>
                    <b>Eco</b>: {cont.eco}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium mt-3 mb-2">
                  {cont.km}
                </p>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  {cont.name}
                </p>
                <div className="text-sm text-gray-500 font-medium flex justify-between">
                  <p className=" ">{cont.location}</p>
                  <span>{cont.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
