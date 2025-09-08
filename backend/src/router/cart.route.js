import { Router } from "express";

const router = Router();

import {
  cartDetails,
  addToCart,
  deleteCartProduct,
} from "../controller/cart.controller.js";
import { authMiddleware } from "../middleware/userAuth.middleware.js";

router.route("/cart").get(authMiddleware, cartDetails);

router.route("/addToCart").post(authMiddleware, addToCart);

router
  .route("/deleteCartProduct/:id")
  .delete(authMiddleware, deleteCartProduct);

export default router;
