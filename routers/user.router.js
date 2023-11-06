import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

// Lấy thông tin tất cả người dùng
router.get('/', UserController.getProfile);

// Update thông tin người dùng
router.put('/:id', UserController.updateProfile);

// Xóa người dùng
router.delete('/:id', UserController.deleteProfile);

// Đổi mật khẩu người dùng
router.put('/change-password/:id', UserController.changePassword);

export default router;

