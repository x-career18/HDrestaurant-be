import express from 'express';
import BillController from '../controllers/bill.controller.js';

const router = express.Router();

// Lấy thông tin tất cả bill
router.get('/', BillController.getBill);

// Lấy thông tin bill theo id
router.get('/:id', BillController.getBillById);

// Lấy thông tin bill theo bookingId
router.get('/booking/:id', BillController.getBillByBooking);

// Tạo mới bill
router.post('/', BillController.createBill);

// Cập nhật thông tin bill
router.put('/:id', BillController.updateBill);

// Xóa bill
router.delete('/:id', BillController.deleteBill);

export default router;