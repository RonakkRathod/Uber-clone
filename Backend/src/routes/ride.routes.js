import express from "express";
import { Router } from "express";
import { body, query } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";
import { getRideFare, handleCreateRide } from "../controllers/ride.controller.js";

const router = Router();

// ride creation route with validation and authentication middleware
router.post(
  "/create",
  authUser,
  body("pickupLocation")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location is required and must be a non-empty string"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required and must be a non-empty string"),
  body("vehicleType")
    .isIn(["auto", "motorcycle", "car"])
    .withMessage("Vehicle type must be one of auto, motorcycle, or car"),
  handleCreateRide,
);

router.get(
  "/fare",
  authUser,
  query("pickupLocation")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location is required and must be a non-empty string"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required and must be a non-empty string"),
  getRideFare
);

export default router;