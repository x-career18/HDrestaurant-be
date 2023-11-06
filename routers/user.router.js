import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Lấy thông tin tất cả quản lý
router.get('/manage', UserController.getManager);
// Lấy thông tin tất cả nhân viên
router.get('/employee', UserController.getEmployee);
// Lấy thông tin tất cả người dùng
router.get('/', UserController.getAllUser);
// Lấy thông tin id người dùng
router.get('/:id', authMiddleware, UserController.getProfileId);

// Update thông tin người dùng
router.put('/:id', UserController.updateProfile);

// Xóa người dùng
router.delete('/:id', UserController.deleteProfile);

// Đổi mật khẩu người dùng
router.put('/change-password/:id', UserController.changePassword);

export default router;

