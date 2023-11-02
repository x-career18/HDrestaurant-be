import express from 'express';
import { loginValidation } from '../validations/login.validation.js';
import { registerValidation } from '../validations/register.validation.js';
import AuthController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validationMdw } from '../middlewares/validate.middleware.js';

const router = express.Router();

// Đăng ký người dùng (chỉ cho quản lý)
router.post('/register', validationMdw(registerValidation), AuthController.register);

// Đăng nhập người dùng (cho cả admin, quản lý và nhân viên)
router.post('/login', validationMdw(loginValidation), AuthController.login);

// Lấy thông tin người dùng (me) - yêu cầu xác thực token
router.get('/me', authMiddleware, AuthController.getMe);

export default router;