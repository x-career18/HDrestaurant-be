import MenuModel from "../models/menu.model.js";
import RestaurantModel from "../models/restaurant.model.js";
import { randomString } from "../utils/GeneratorUtils.js";
import { checkManagerAndIsVerified } from "../utils/checkManagerAndVerified.js";

const createMenu = async (req, res) => {
    try {
        const userId = req.user.id;
        const restaurant = await RestaurantModel.findOne({ idManager: userId });

        const isManagerAndVerified = await checkManagerAndIsVerified(userId);

        if (!isManagerAndVerified) {
            return res.status(403).json({ message: 'Bạn không có quyền thực hiện chức năng này.' });
        }

        const { name, category, description, price, discount } = req.body;

        const newMenu = new MenuModel({
            code: 'M_' + randomString(3),
            name,
            category,
            description,
            price,
            discount,
            idRestaurant: restaurant.idRestaurant,
        });

        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateMenu = async (req, res) => {
    try {
        const userId = req.user.id;

        const isManagerAndVerified = await checkManagerAndIsVerified(userId);

        if (!isManagerAndVerified) {
            return res.status(403).json({ message: 'Bạn không có quyền thực hiện chức năng này.' });
        }

        const menuId = req.params.id;
        const { name, category, description, price, discount } = req.body;

        const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, { name, category, description, price, discount }, { new: true });
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const userId = req.user.id;

        const isManagerAndVerified = await checkManagerAndIsVerified(userId);

        if (!isManagerAndVerified) {
            return res.status(403).json({ message: 'Bạn không có quyền thực hiện chức năng này.' });
        }

        const menuId = req.params.id;

        await MenuModel.findByIdAndDelete(menuId);
        res.json({ message: 'Menu đã bị xóa thành công.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const MenuController = {
    createMenu,
    updateMenu,
    deleteMenu,
};

export default MenuController;