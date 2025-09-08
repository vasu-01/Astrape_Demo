import express from "express";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";

const cartDetails = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId"
    );
    res.json(cart || { item: [] });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong while fetching cart details!",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        products: [],
      });
    }
    console.log("cart: ", cart);

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong while adding product to cart!",
    });
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // console.log("cart :", cart);

    console.log("Param ID:", req.params.id);

    cart.products = cart.products.filter(
      (product) => product._id.toString() !== req.params.id
    );
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product deleted form cart!" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong while deleting product from cart!",
    });
  }
};

export { cartDetails, addToCart, deleteCartProduct };
