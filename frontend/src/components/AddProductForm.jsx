import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProductForm() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    productCode: "",
    name: "",
    eco: "",
    price: "",
    category: "",
    location: "",
    description: "",
    featuresText: "",
    date: "",
    year: "",
    bannerImg: null,
    galleryImg: [],
    km: "",
    ownerName: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "galleryImg") {
      setformData((prev) => ({
        ...prev,
        galleryImg: Array.from(files),
      }));
    } else if (name === "bannerImg") {
      setformData((prev) => ({
        ...prev,
        bannerImg: files[0],
      }));
    } else {
      setformData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();
    data.append("productCode", formData.productCode);
    data.append("name", formData.name);
    data.append("eco", formData.eco);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("year", formData.year);
    data.append("description", formData.description);
    data.append("km", formData.km);
    data.append("ownerName", formData.ownerName);

    data.append("features", formData.featuresText);

    if (formData.bannerImg) {
      data.append("bannerImg", formData.bannerImg);
    }

    formData.galleryImg.forEach((file) => {
      data.append("galleryImg", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/home/addProduct`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const productData = response.data;

      if (response.data.success) {
        alert("Product added successfully!");
        navigate("/home", { state: { newProduct: productData } });
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (err) {
      console.log("Login error", err);
      if (err.response?.data?.message) {
        alert(`Error:${err.response.data.message}`);
      } else {
        alert("An unexpected error occured");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full h-[820px] mt-10 mb-10 max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Product Details
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* name  */}

          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="ownerName"
              placeholder="Enter owner fullname"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ProductCode */}
          <input
            type="text"
            name="productCode"
            placeholder="Enter unique product code using your username e.g. vasu_chair"
            value={formData.productCode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            {/* {Object.keys(categoryAttributes).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))} */}
          </select>

          {/* Eco & Price */}
          <div className="flex gap-4">
            <input
              type="number"
              name="eco"
              placeholder="Eco"
              value={formData.eco}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="km"
              placeholder="Kilometer"
              value={formData.km}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <textarea
            type="text"
            name="description"
            placeholder="Product Description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Features */}
          <textarea
            type="text"
            name="featuresText"
            placeholder="Product features..."
            value={formData.featuresText || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Date & Year */}

          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="year"
              placeholder="Enter year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* banner Img & galleryImg */}
          <div className="flex gap-4">
            <input
              type="file"
              name="bannerImg"
              accept="image/*"
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="file"
              name="galleryImg"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
