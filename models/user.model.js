import mongoose from "mongoose";
import { ROLE_LIST } from "../constants.js";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLE_LIST.ADMIN, ROLE_LIST.MANAGER, ROLE_LIST.EMPLOYEE],
      default: ROLE_LIST.EMPLOYEE,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    idRestaurant: {
      type: String,
    },
    employeeCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
