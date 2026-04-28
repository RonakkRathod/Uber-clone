import { Ride } from "../Models/ride.model.js";
import { getDistanceTime } from "../utils/maps.js";
import { ApiError } from "../utils/apiError.js";
import { randomInt } from "crypto";


const getFare = async (pickup, destination) => {
    
    if (!(pickup && destination)) {
        throw new ApiError(401,"pickup and destination are required to start a ride")
    }

    const distanceTime = await getDistanceTime(pickup, destination);
    
    if (!distanceTime) {
        throw new ApiError(500, "Failed to calculate fare - unable to retrieve distance and time");
    }

    const { distanceInKm, durationInHours } = distanceTime;

    const rates = {
        auto: { base: 20, perKm: 10, perHour: 50 },
        motorcycle: { base: 15, perKm: 8, perHour: 40 },
        car: { base: 30, perKm: 12, perHour: 60 }
    };

    const calculate = ({ base, perKm, perHour }) => {
        return Math.ceil(base + distanceInKm * perKm + durationInHours * perHour);
    };

    return {
        auto: calculate(rates.auto),
        motorcycle: calculate(rates.motorcycle),
        car: calculate(rates.car)
    };
}

const createRide = async ({ userId, pickupLocation, destination, vehicleType }) => {
   
    if (!(userId && pickupLocation && destination && vehicleType)) {
        throw new ApiError(400,"userId, pickupLocation, destination and vehicleType are required to start a ride")
    }

    const fareRate = await getFare(pickupLocation, destination)

    if (!fareRate) {
        throw new ApiError(500, "unable to calculate fare");
    }

    const ride = await Ride.create({
        userId,
        pickupLocation,
        destination,
        fare: fareRate[vehicleType], // which vehicle type user selected that fare will be assigned to rideDB
        otp: getOTP()
    })

    if (!ride) {
        throw new ApiError(500, "Failed to create ride");
    }

    return ride;
}

const getOTP = () => {
    let otp = "";
    for (let i = 0; i < 4; i++) {
        otp += randomInt(0, 10).toString();
    }
    return otp;
}

export {
    getFare,
    createRide,
    getOTP
}