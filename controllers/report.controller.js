import ReportModel from "../models/report.model.js";
import { Status } from "../constants.js";

const createReport = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    const newReport = new ReportModel({
      fullName,
      email,
      message,
      status: Status.PENDING,
    });
    const reportSent = await newReport.save();
    res.status(200).json(reportSent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateReport = async (req, res) => {
  try {
    const updatedReport = await ReportModel.findByIdAndUpdate(
      req.params.id,
      { status: Status.RESOLVED },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found." });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const deletedReport = await ReportModel.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found." });
    }
    res.status(200).json({ message: "Report deleted." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const ReportController = {
  createReport,
  getReport,
  updateReport,
  deleteReport,
};
export default ReportController;
