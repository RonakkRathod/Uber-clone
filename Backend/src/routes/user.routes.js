import { Router } from "express";
import { body } from  "express-validator";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register',[
    body("fullName.firstName").notEmpty().withMessage("First Name is required"),
    body("fullName.lastName").notEmpty().withMessage("Last Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")
], registerUser)

router.post('/login',[
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")
],loginUser)

router.get('/profile', authUser, getUserProfile)



export default router;