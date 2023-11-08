import UserModel from "../models/user.model.js";
import { ROLE_LIST } from "../constants.js";
import bcrypt from 'bcrypt';
import RestaurantModel from "../models/restaurant.model.js";

const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getManager = async (req, res) => {
    try {
        const users = await UserModel.find({ role: ROLE_LIST.MANAGER });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const managerUserId = req.user.id; // Lấy _id của người quản lý từ req.user
        // Tìm nhà hàng mà người quản lý quản lý
        const managedRestaurant = await RestaurantModel.findOne({ idManager: managerUserId });

        if (!managedRestaurant) {
            return res.status(403).json({ message: "Người quản lý không quản lý bất kỳ nhà hàng nào." });
        }
        // Tìm tất cả người dùng có role là 'Employee' và có idRestaurant trùng với idRestaurant của người quản lý
        const employees = await UserModel.find({ role: ROLE_LIST.EMPLOYEE, idRestaurant: managedRestaurant.idRestaurant });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfileId = async (req, res) => {
    try {
        const { id } = req.user;
        const users = await UserModel.findById(id)

        if (!users) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const userProfile = {
            _id: users._id,
            fullname: users.fullname,
            email: users.email,
            phonenumber: users.phonenumber,
            role: users.role,
            isActive: users.isActive,
            idRestaurant: users.idRestaurant,
            employeeCode: users.employeeCode,
        };
        res.status(200).json(userProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const { fullname, email, password, newPassword, phonenumber, isActive } = req.body;


        if (fullname) {
            user.fullname = fullname;
        }

        if (email) {
            user.email = email;
        }

        if (phonenumber) {
            user.phonenumber = phonenumber;
        }

        if (typeof isActive === 'boolean') {
            user.isActive = isActive;
        }

        if (password && newPassword) {
            // Kiểm tra xem mật khẩu cũ có trùng với mật khẩu mới không
            const isPasswordMatch = bcrypt.compareSync(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
            }

            // Băm và lưu mật khẩu mới
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần
        res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng" });
    }
};

const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa người dùng" });
    }
};


const changePassword = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        if (!user.checkPassword(req.body.currentPassword)) {
            return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
        }

        user.password = req.body.newPassword;

        await user.save();

        res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        console.error("Lỗi khi đổi mật khẩu người dùng:", error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};

const UserController = {
    getAllUser,
    getManager,
    getEmployee,
    getProfileId,
    updateProfile,
    deleteProfile,
    changePassword,
};

export default UserController;