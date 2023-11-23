import mongoose from "mongoose";
import { Status } from "../constants.js";

const ReportSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.PENDING,
    },
  },
  { timestamps: true }
);

const ReportModel = mongoose.model("Report", ReportSchema);

export default ReportModel;
