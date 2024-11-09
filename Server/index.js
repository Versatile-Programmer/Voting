// index.js
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Initialize the app
const app = express();

// Connect to the database
//connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const electionRoutes = require("./routes/electionRoutes");
const authRouter = require("./routes/authRoutes");
app.use("/api", electionRoutes);
app.use('/auth',authRouter);

// Start the server
const PORT = port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
