import { Product } from "../model/product.model.js";
import { uploadCloudinary } from "../utils/Cloudinary.js";

const addProduct = async (req, res) => {
  try {
    const {
      productCode,
      name,
      price,
      category,
      eco,
      location,
      date,
      description,
      km,
      ownerName,
      // features
    } = req.body;
    req.body;
    if (
      !(
        productCode &&
        name &&
        price &&
        category &&
        eco &&
        location &&
        date &&
        description &&
        km &&
        ownerName
      )
    ) {
      return res.status(200).json({ message: "All fields are required" });
    }

    const productExists = await Product.findOne({
      productCode: productCode.toLowerCase(),
    });
    if (productExists) {
      return res.status(409).json({ message: "Product already exists!" });
    }
    console.log(productCode);

    //accessing banner and galleryimages
    const bannerImgLocalPath = req.files?.bannerImg?.[0]?.path;
    if (!bannerImgLocalPath) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const galleryImgLocalPath = req.files["galleryImg"]?.map((f) => f.path);
    if (!req.files["galleryImg"] || req.files["galleryImg"].length < 3) {
      return res
        .status(400)
        .json({ message: "Atleast 3 gallery images are required!" });
    }

    const bannerImg = await uploadCloudinary(bannerImgLocalPath);

    const uploadImages = await Promise.all(
      galleryImgLocalPath.map((path) => uploadCloudinary(path))
    );
    const galleryImg = uploadImages
      .filter(Boolean)
      .map((img) => img.secure_url);

    let features = [];
    if (req.body.features) {
      features = req.body.features
        .split("\n")
        .map((line) => line.split(","))
        .flat()
        .map((f) => f.trim())
        .filter((f) => f);
    }
    console.log(features);

    //storing all data in backend
    const productCreated = await Product.create({
      ...req.body,
      features,
      bannerImg: bannerImg.secure_url,
      galleryImg,
    });

    if (!productCreated) {
      return res.status(201).json({
        success: false,
        message: "Product not added, Something went wrong!",
      });
    }
    console.log("productCreated", productCreated);

    return res.status(201).json({
      success: true,
      productCreated,
      message: "Product added successfully!",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log("hlo");

    const { id } = req.params;
    const product = await Product.findById(id);
    console.log("getPro", product);

    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (req.files?.bannerImg) {
      const bannerImg = await uploadCloudinary(req.files.bannerImg[0].path);
      req.body.bannerImg = bannerImg.secure_url;
    }

    if (req.files?.galleryImg) {
      const galleryImgLocalPath = req.files["galleryImg"]?.map((f) => f.path);
      const uploadImages = await Promise.all(
        galleryImgLocalPath.map((path) => uploadCloudinary(path))
      );
      req.body.galleryImg = uploadImages
        .filter(Boolean)
        .map((img) => img.secure_url);
    }

    product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong while deleting product!",
    });
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
