// models/Election.js
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const electionSchema = new mongoose.Schema({
  electionName: { type: String, required: true },
  numCandidates: { type: Number, required: true },
  candidates: [candidateSchema],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  club: { type: String, required: true },
});

module.exports = mongoose.model("Election", electionSchema);
