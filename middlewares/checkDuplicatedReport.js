import ReportModel from "../models/report.model.js";

const checkDuplicatedReport = async (req, res, next) => {
  try {
    const { email, fullName, message } = req.body;

    const existingReport = await ReportModel.findOne({
      $and: [{ email }, { fullName }, { message }],
    });

    if (existingReport) {
      return res
        .status(400)
        .json({ error: "Duplicated report." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default checkDuplicatedReport;
