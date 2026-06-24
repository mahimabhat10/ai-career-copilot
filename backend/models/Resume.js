const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  atsScore: Number,
  recommendedRole: String,
  resumeStrength: String,
  resumeText: String,
  resumeUrl: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Resume", ResumeSchema);