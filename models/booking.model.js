import mongoose from 'mongoose';
import { Status } from '../constants.js';

const BookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
    numberOfPeople: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    status: {
        type: String,
        enum: Status,
        default: Status.PENDING,
    },
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', BookingSchema);

export default BookingModel;
