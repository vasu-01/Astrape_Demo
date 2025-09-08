import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function RecentSearch({ label }) {
  return (
    <div className="flex items-center bg-white text-black rounded-lg m-2 px-2 py-1 shadow cursor-pointer transition hover-bg-gray-400">
      <span className="mr-2 text-md truncate max-w-[1000px] ">{label}</span>
      <IoCloseOutline className="h-4 w-4" />
    </div>
  );
}
