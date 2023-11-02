import RestaurantModel from "../models/restaurant.model.js";

export const checkRestaurantExistence = async (req, res, next) => {
    const { idRestaurant } = req.body;

    try {
        const existingRestaurant = await RestaurantModel.findOne({ idRestaurant });

        if (!existingRestaurant) {
            return res.status(404).json({ message: 'Nhà hàng không tồn tại' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi kiểm tra sự tồn tại của nhà hàng' });
    }
};
