import express from "express";
import { Router } from "express";
import { body } from  "express-validator";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";
const router = Router();

router.post('/register',[
    body('fullName.firstName').not().isEmpty().withMessage('First name is required'),
    body('fullName.lastName').not().isEmpty().withMessage('Last name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').not().isEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').not().isEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'autoRickshaw']).withMessage('Vehicle type must be either car, motorcycle, or autoRickshaw')
],registerCaptain)

router.post('/login',[
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
], loginCaptain)

router.get('/profile', authCaptain, getCaptainProfile)
router.post('/logout', authCaptain, logoutCaptain)

export default router;