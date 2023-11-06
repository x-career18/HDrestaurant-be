import UserModel from "../models/user.model.js";
import { ROLE_LIST } from "../constants.js";

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
        const users = await UserModel.find({ role: ROLE_LIST.EMPLOYEE });
        res.json(users);
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

        const { fullname, email, phonenumber, isActive } = req.body;


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
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        await user.remove();
        res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần
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