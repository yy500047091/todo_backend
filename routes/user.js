import express from "express";
// import { User } from "../models/user.js";
import { deleteUser,  getMyProfile, getUserDetails, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../controllers/middleware/auth.js";

const router = express.Router();

// router.get("/all", getAllUsers);

router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);

router.get("/me",isAuthenticated,getMyProfile);



router.delete("/userid/:id", deleteUser);




export default router;
