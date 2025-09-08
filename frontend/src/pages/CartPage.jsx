import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/product/cart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);

      setCart(response.data?.products ?? response.data?.products ?? []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  //   console.log("cart:", cart);
  const removeFromCart = async (productId) => {
    try {
      // console.log("productId: ", productId);
      const response = await axios.delete(
        `${import.meta.env.VITE_URL}/product/deleteCartProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // console.log("responsedelete: ", response);
        setCart((prevCart) =>
          prevCart.filter((item) => item._id !== productId)
        );
        alert(response.data.message);
        fetchCart(); // refresh cart
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={product.productId?.bannerImg}
                  alt={product.productId?.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {product.productId?.name}
                  </h2>
                  <p className="text-gray-600">
                    ${product.productId?.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="text-right mt-6 text-xl font-bold">
            Total: $
            {cart
              .reduce(
                (acc, item) =>
                  acc + (item.productId?.price || 0) * item.quantity,
                0
              )
              .toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
