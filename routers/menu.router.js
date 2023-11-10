import express from 'express';
import MenuController from '../controllers/menu.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Lấy danh sách menu
router.get('/', authMiddleware, MenuController.getMenus);4

// Tạo mới menu
router.post('/', authMiddleware, MenuController.createMenu);

// Cập nhật menu
router.put('/:id', authMiddleware, MenuController.updateMenu);

//Xóa menu
router.delete('/:id', authMiddleware, MenuController.deleteMenu);

export default router;