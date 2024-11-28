// const app = require("./app");
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
    origin: {"https://chatbot-frontend-five-iota.vercel.app/"},
     methods: {"POST", "GET", "DELETE", "PUT"},
    credentials: true
  }
));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

// Database connection
const db = () =>{
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
}
db();
const PORT = process.env.PORT || 5000;
// app();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;
