const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Resume = require("../models/Resume");
const verifyToken = require("../middleware/authMiddleware");
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

if (user.role !== "admin") {
  return res.status(403).json({
    message: "Access Denied",
  });
}
    const totalUsers = await User.countDocuments();

    const totalResumes = await Resume.countDocuments();

    const resumes = await Resume.find();

    const averageATS =
      resumes.length > 0
        ? (
            resumes.reduce(
              (sum, resume) => sum + (resume.atsScore || 0),
              0
            ) / resumes.length
          ).toFixed(1)
        : 0;

    res.json({
      totalUsers,
      totalResumes,
      averageATS,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
});

module.exports = router;