import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref :"User",
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref :"Captain",
    },
    pickupLocation: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number, // Duration in hours
    },
    distance: {
        type: Number, // Distance in kilometers
    },
    paymentID:{
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        selected: false,
        required: true
    }
})

export const Ride = mongoose.model("Ride",rideSchema)