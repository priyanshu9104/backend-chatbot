const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
    origin: "http://localhost:3000",
  }
));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
