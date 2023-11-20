import mongoose from "mongoose";
import { Status } from "../constants.js";

const BillSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        dishes: [
            {
                dishName: String,
                quantity: Number,
                discount: Number,
                total: Number,
            },
        ],
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        paymentMethod: {
            type: String,
            enum: ['transfer', 'cash'],
            required: true,
        },
        status: {
            type: String,
            enum: Status,
            default: Status.PENDING,
        },
    }, { timestamps: true }
);

const BillModel = mongoose.model("Bill", BillSchema);

export default BillModel;