import UserModel from "../models/user.model.js";
import { ROLE_LIST } from "../constants.js";

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const users = await UserModel.findById(userId);

        if (!users) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const usserProfile = {
            _id: users._id,
            fullname: users.fullname,
            email: users.email,
            phonenumber: users.phonenumber,
            role: users.role,
            isActive: users.isActive,
            idRestaurant: users.idRestaurant,
            employeeCode: users.employeeCode,
        };
        res.status(200).json(usserProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const { fullname, phonenumber } = req.body;
        if (!fullname || !phonenumber) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        // Kiểm tra vai trò của người dùng
        if (user.role === ROLE_LIST.ADMIN) {
            // Nếu là quản lý hoặc admin, cho phép sửa thông tin của cả quản lý và nhân viên
            user.fullname = fullname;
            user.phonenumber = phonenumber;
        } else if (user.role === ROLE_LIST.MANAGER) {
            // Nếu là quản lý, chỉ cho phép sửa thông tin của nhân viên
            if (user.role !== ROLE_LIST.EMPLOYEE) {
                return res.status(403).json({ message: "Bạn không có quyền sửa thông tin này" });
            }

            user.fullname = fullname;
            user.phonenumber = phonenumber;
        } else {
            return res.status(403).json({ message: "Bạn không có quyền sửa thông tin" });
        }

        await user.save();

        res.status(200).json({ message: "Cập nhật thông tin thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        // Kiểm tra vai trò của người dùng
        if (user.role === ROLE_LIST.ADMIN) {
            // Nếu là quản lý hoặc admin, cho phép xóa cả quản lý và nhân viên
            await user.remove();
        } else if (user.role === ROLE_LIST.MANAGER) {
            // Nếu là quản lý, chỉ cho phép xóa nhân viên
            if (user.role !== ROLE_LIST.EMPLOYEE) {
                return res.status(403).json({ message: "Bạn không có quyền xóa người dùng" });
            }

            await user.remove();
        } else {
            return res.status(403).json({ message: "Bạn không có quyền xóa người dùng" });
        }

        res.status(200).json({ message: "Xóa người dùng thành công" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
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
    getProfile,
    updateProfile,
    deleteProfile,
    changePassword,
};

export default UserController;