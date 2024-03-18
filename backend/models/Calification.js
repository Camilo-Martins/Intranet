const mongoose = require("mongoose");

const calificationsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    trim: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Calification", calificationsSchema);
