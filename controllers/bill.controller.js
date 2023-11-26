import BillModel from "../models/bill.model.js";
import { Status } from "../constants.js";

// lấy thông tin tất cả bill
const getBill = async (req, res) => {
    try {
        const bills = await BillModel.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// lấy thông tin bill theo id
const getBillById = async (req, res) => {
    try {
        const bill = await BillModel.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: "Không tìm thấy bill" });
        }
        res.status(200).json(bill);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const getBillByBooking = async (req, res) => {
    try {
        const bill = await BillModel.findOne({ bookingId: req.params.bookingId });
        console.log(req.params.bookingId, "bookingId");
        if (!bill) {
            return res.status(404).json({ message: "Không tìm thấy bill" });
        }
        res.status(200).json(bill);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Tạo mới bill
const createBill = async (req, res) => {
    try {
        const { fullName, phoneNumber, dishes, discount, totalAmount, employeeCode, idRestaurant, bookingId } = req.body;

        const newBill = new BillModel({
            fullName,
            phoneNumber,
            dishes,
            discount,
            totalAmount,
            employeeCode,
            idRestaurant,
            bookingId,
        });

        const savedBill = await newBill.save();
        res.status(200).json(savedBill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// cập nhật thông tin bill
const updateBill = async (req, res) => {
    try {
        const { fullName, phoneNumber, dishes, totalAmount, paymentMethod , status} = req.body;

        const bill = await BillModel.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: "Không tìm thấy bill" });
        }

        bill.fullName = fullName;
        bill.phoneNumber = phoneNumber;
        bill.dishes = dishes;
        bill.totalAmount = totalAmount;
        bill.paymentMethod = paymentMethod;
        bill.status = status;

        const savedBill = await bill.save();
        res.status(200).json(savedBill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa bill theo ID
const deleteBill = async (req, res) => {
    try {
        const deletedBill = await BillModel.findByIdAndDelete(req.params.id);
        if (!deletedBill) {
            return res.status(404).json({ message: 'Không tìm thấy bill.' });
        }
        res.status(200).json(deletedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const BillController = {
    getBill,
    getBillById,
    getBillByBooking,
    createBill,
    updateBill,
    deleteBill,
};

export default BillController;
