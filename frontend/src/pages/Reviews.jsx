import React from "react";
import Star from "../components/Star";

export default function Reviews() {
  return (
    <div className="px-16 py-5">
      <p className="text-3xl font-bold mt-10 mb-10">
        Transact with a trusted local community
      </p>
      <div className="flex justify-between">
        <div className="h-46 w-71">
          <div className="flex ">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star />
            ))}
          </div>
          <div>
            <h1 className="text-lg">
              <b>Smooth and secure transaction</b>
            </h1>
            <p className="text-gray-500 ">
              Bought a cooler via AI during their summer sale. The listing was
              genuine, and the seller was super responsive. Quick, easy, and
              trustworthy experience!
            </p>
            <p className="text-gray-900">
              <b>@kiranonline</b>
            </p>
          </div>
        </div>

        <div className="h-46 w-71">
          <div className="flex ">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star />
            ))}
          </div>
          <div>
            <h1 className="text-lg">
              <b>Best place to sell locally!</b>
            </h1>
            <p className="text-gray-500">
              Listed my old fridge for free on AI and got inquiries the same
              day.No hidden charges, and the app is very user-freindly.
            </p>
            <p className="text-gray-900">
              <b>@sellwithme</b>
            </p>
          </div>
        </div>

        <div className="h-46 w-71">
          <div className="flex ">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star />
            ))}
          </div>
          <div>
            <h1 className="text-lg">
              <b>Highly recommended marketplace</b>
            </h1>
            <p className="text-gray-500">
              I've used AI both to sell my old fan and buy a new AC. It's super
              simple to list items and even better to browse. I love the
              AI-CREDITS system!
            </p>
            <p className="text-gray-900">
              <b>@rahul_trades</b>
            </p>
          </div>
        </div>

        <div className="h-46 w-71">
          <div className="flex ">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star />
            ))}
          </div>
          <div>
            <h1 className="text-lg">
              <b>Smooth and secure transaction</b>
            </h1>
            <p className="text-gray-500">
              Bought a cooler via AI during their summer sale. The listing was
              genuine, and the seller was super responsive. Quick, easy, and
              trustworthy experience!
            </p>
            <p className="text-gray-900">
              <b>@kiranonline</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
