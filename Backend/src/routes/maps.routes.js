import express from 'express';
import { Router } from 'express';
import {authUser} from '../middleware/auth.middleware.js';
import { getCordinates, getDistance, getSuggestions } from '../controllers/maps.controller.js';
import { query } from 'express-validator';


const router = Router();

router.get('/maps',
    query('address').isString().isLength({ min: 3}).withMessage('Address is required and must be a non-empty string')
    ,authUser,getCordinates)

router.get('/get-distance',
    query('origin').isString().isLength({ min: 3}).withMessage('Origin is required and must be a non-empty string'),
    query('destination').isString().isLength({ min: 3}).withMessage('Destination is required and must be a non-empty string'),
    authUser,getDistance
)

router.get('/suggestions',
    query('input').isString().isLength({ min: 3}).withMessage('Query is required and must be a non-empty string'),
    authUser,getSuggestions
)

export default router;