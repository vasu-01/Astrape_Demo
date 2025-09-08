import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/userAuth.middleware.js";

const router = Router();

router.route("/addProduct").post(
  authMiddleware,
  upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "galleryImg", maxCount: 5 },
  ]),
  addProduct
);

router.route("/products").get(getProducts);

router.route("/product/:id").get(getProductById);

router.route("/updateProduct/:id").put(
  authMiddleware,
  upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "galleryImg", maxCount: 5 },
  ]),
  updateProduct
);

router.route("/deleteProduct/:id").delete(authMiddleware, deleteProduct);
export default router;
