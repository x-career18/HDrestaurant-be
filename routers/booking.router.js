import express from 'express';
import BookingController from '../controllers/booking.controller.js';

const router = express.Router();

// Lấy thông tin tất cả đặt bàn
router.get('/', BookingController.getBooking);

// Tạo mới đặt bàn
router.post('/', BookingController.createBooking);

// Lấy thông tin đặt bàn theo id
router.get('/:id', BookingController.getBookingById);

// Cập nhật thông tin đặt bàn
router.put('/:id', BookingController.updateBooking);

// Xóa đặt bàn
router.delete('/:id', BookingController.deleteBooking);

export default router;