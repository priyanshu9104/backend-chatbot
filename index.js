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
    origin: "https://chatbot-frontend-five-iota.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

// Database connection
const db = () =>{

  try {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    // app.listen(5000, () => {
    //   console.log("Server listening on 5000 http://localhost:5000");
    // });
  } catch (err) {
    console.log(err)
  }
  
  
  
  // .catch((err) => console.error("MongoDB connection error:", err));
}
db();
const PORT = process.env.PORT || 5000;
// app();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;
