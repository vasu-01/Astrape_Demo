import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser, loginUser } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
// router
//   .route("/register")
//   .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);

// router.route("/getUser")

export default router;
