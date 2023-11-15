import BookingModel from "../models/booking.model.js";
import { Status } from '../constants.js';
import { ROLE_LIST } from '../constants.js';

// tạo mới booking
const createBooking = async (req, res) => {
    try {
        const { fullName, phoneNumber, bookingDate, bookingTime, numberOfPeople, email, message, restaurantId } = req.body;


        let bookingStatus;

        if (req.user && req.user.role === ROLE_LIST.EMPLOYEE) {
            bookingStatus = Status.ACTIVE;
        } else {
            bookingStatus = Status.PENDING;
        }
        const newBooking = new BookingModel({
            fullName,
            phoneNumber,
            bookingDate,
            bookingTime,
            numberOfPeople,
            email,
            message,
            restaurantId,
            status: bookingStatus,
        });

        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// lấy thông tin tất cả booking
const getBooking = async (req, res) => {
    try {
        const bookings = await BookingModel.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// lấy thông tin booking theo id
const getBookingById = async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Không tìm thấy đặt bàn" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// cập nhật thông tin booking
const updateBooking = async (req, res) => {
    try {
        const { fullName, phoneNumber, bookingDate, bookingTime, numberOfPeople, email, message } = req.body;

        const updatedBooking = await BookingModel.findByIdAndUpdate(
            req.params.id,
            { fullName, phoneNumber, bookingDate, bookingTime, numberOfPeople, email, message, status: Status.ACTIVE },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Không tìm thấy đặt bàn.' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa đặt bàn theo ID
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await BookingModel.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Không tìm thấy đặt bàn.' });
        }
        res.status(200).json({ message: 'Đặt bàn đã bị xóa thành công.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const BookingController = {
    createBooking,
    getBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
};

export default BookingController;