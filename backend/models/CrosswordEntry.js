const mongoose = require("mongoose");

const crosswordEntrySchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  timeTaken: {
    type: Number, // seconds
    default: null,
  },
  accuracy: {
    type: Number, // percentage 0–100
    default: null,
  },
  solvedWordsCount: {
    type: Number,
    default: 0,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CrosswordEntry", crosswordEntrySchema, "Demousers");
