import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    bannerImg: {
      type: String,
      required: true,
    },
    galleryImg: {
      type: [String],
      default: [],
    },
    eco: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    km: {
      type: Number,
    },
    ownerName: {
      type: String,
      required: true,
    },
    // attributes: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
