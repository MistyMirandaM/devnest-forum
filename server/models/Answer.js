const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);

