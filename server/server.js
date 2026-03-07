require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));


app.use(express.json());

app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false
}));

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  })
  .catch(err => {
    console.log("Database connection error:", err);
  });

  const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);
