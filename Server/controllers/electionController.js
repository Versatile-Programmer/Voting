// controllers/electionController.js
const Election = require("../models/Election");

// Create new election
exports.createElection = async (req, res) => {
  console.log("Create Election called")
  try {
    const election = await Election.create(req.body);
    console.log("priting election->",req.body)
    res.status(201).json(election);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getElectionById = async (req, res) => {
  try {
    console.log('priting req=>',req.params.electionId)
    const election = await Election.findById(req.params.electionId);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }
    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
