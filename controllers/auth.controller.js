import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { ROLE_LIST } from '../constants.js';
import RestaurantModel from '../models/restaurant.model.js';
import GenerateEmployeeCode from '../utils/genrateEmployee.js';

// Đăng ký người dùng (chỉ cho quản lý)
const register = asyncHandler(async (req, res) => {
    const { fullname, email, password, phonenumber, idRestaurant } = req.body;
    //1.Validation
    if (!fullname || !email || !password || !phonenumber) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    try {
        //2. Check user exist
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }
        //Has password (mã hoá password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //3. Create new user

        // Determine role and create new user accordingly
        let role = ROLE_LIST.MANAGER;
        let employeeCode;
        let restaurantId;


        if (idRestaurant) {
            const restaurant = await RestaurantModel.findOne({ idRestaurant });

            if (restaurant && restaurant.isVerified) {
                role = ROLE_LIST.EMPLOYEE;
                employeeCode = GenerateEmployeeCode();
                restaurantId = restaurant._id;
            } else {
                return res.status(400).json({ message: 'Nhà hàng chưa được xác nhận.' });
            }
        }

        const newUser = new UserModel({
            fullname,
            email,
            password: hashedPassword,
            role,
            phonenumber,
            isActive: false,
            idRestaurant,
            employeeCode,
            restaurantId,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        //1. Check authentication
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            res.status(401);
            throw new Error("Thông tin đăng nhập không hợp lệ!");
        }

        //2. Check password
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            res.status(401);
            throw new Error("Email hoặc mật khẩu không đúng!");
        }

        // 3. Check role and isActive
        let role = ROLE_LIST.MANAGER;  // Mặc định là quản lý
        if (existingUser.idRestaurant) {
            role = ROLE_LIST.EMPLOYEE;
        } else if (existingUser.role === ROLE_LIST.ADMIN) {
            role = ROLE_LIST.ADMIN;
        }

        if ((role !== ROLE_LIST.ADMIN && role !== ROLE_LIST.MANAGER && role !== ROLE_LIST.EMPLOYEE) || existingUser.isActive !== true) {
            res.status(403);
            throw new Error("Tài khoản của bạn chưa được xác nhận.");
        }

        //4.Tạo mã thông báo JWT
        const jwtPayload = {
            email: existingUser.email,
            id: existingUser.id,
            fullname: existingUser.fullname,
            restaurantId: existingUser.restaurantId,
            role,
        };

        const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        res.header("token", token);

        res.status(200).json({
            accessToken: token,
            message: "Login successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lấy thông tin người dùng (me) - yêu cầu xác thực token
const getMe = asyncHandler(async (req, res) => {
    try {
        const { id } = req.user;
        const user = await UserModel.findById(id).select("-password");

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const AuthController = {
    register,
    login,
    getMe,
};

export default AuthController;