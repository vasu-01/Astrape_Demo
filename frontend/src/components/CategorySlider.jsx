import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  { name: "Cars", img: "/Fortuner.png" },
  { name: "Real Estate", img: "/Home.png" },
  { name: "Mobiles", img: "/Phone.png" },
  { name: "Jobs", img: "Bag.png" },
  { name: "Bikes", img: "/Royal Himalayan bike.png" },
  { name: "Beauty", img: "/beautyprdct.jpg" },
];

export default function CategorySlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <h2 className="text-3xl font-bold mb-10">Explore Categories</h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
      >
        <FaArrowLeft />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-10 overflow-x-auto scrollbar-hide scroll-smooth px-10 scrollbar-hide"
      >
        {categories.map((cat) => (
          <div key={cat.name} className="flex-shrink-0 w-60 text-center">
            <div className="w-60 h-60  rounded-full overflow-hidden bg-gray-100 mx-auto">
              <img
                src={cat.img}
                alt={cat.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{cat.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
