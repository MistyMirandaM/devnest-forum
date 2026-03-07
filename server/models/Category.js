const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true }
);

categorySchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
