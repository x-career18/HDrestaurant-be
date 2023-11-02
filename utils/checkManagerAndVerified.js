import UserModel from '../models/user.model.js';
import RestaurantModel from '../models/restaurant.model.js';
import { ROLE_LIST } from '../constants.js';

async function checkManagerAndIsVerified(userId) {
    try {
        // Tìm người dùng dựa trên userId
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('Không tìm thấy người dùng'); // Báo lỗi nếu không tìm thấy người dùng
        }

        if (user.role !== ROLE_LIST.MANAGER) {
            throw new Error('Người dùng không phải là Manager'); // Báo lỗi nếu role không phải là Manager
        }

        // Tìm nhà hàng dựa trên idManager
        const restaurant = await RestaurantModel.findOne({ idManager: userId });

        if (!restaurant) {
            throw new Error('Không tìm thấy nhà hàng'); // Báo lỗi nếu không tìm thấy nhà hàng
        }

        if (!restaurant.isVerified) {
            throw new Error('Nhà hàng chưa được xác minh'); // Báo lỗi nếu nhà hàng chưa được xác minh
        }

        return true; // Tất cả điều kiện đều đúng
    } catch (error) {
        console.error('Lỗi trong quá trình kiểm tra role Manager:', error);
        if (error.message === 'Người dùng không phải là Manager') {
            throw new Error('Người dùng không phải là Manager');
        } else if (error.message === 'Nhà hàng chưa được xác minh') {
            throw new Error('Nhà hàng của bạn chưa được xác minh trên hệ thống');
        } else {
            throw new Error('Có lỗi xảy ra trong quá trình kiểm tra role Manager');
        }
    }
}

export { checkManagerAndIsVerified };