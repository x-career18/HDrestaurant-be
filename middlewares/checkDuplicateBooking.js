import BookingModel from "../models/booking.model.js";

const checkDuplicateBooking = async (req, res, next) => {
    try {
        const { email, phoneNumber } = req.body;

        // Check if email or phone number already exists in the database
        const existingBooking = await BookingModel.findOne({
            $or: [{ email }, { phoneNumber }],
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'Email or phone number already exists' });
        }

        // If no duplicate, move to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default checkDuplicateBooking;