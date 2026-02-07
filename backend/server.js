require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const User = require("./User");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.post("/register", async (req, res) => {
  const { name, mobile, university } = req.body;

  if (!name || !mobile || !university) {
    return res.status(400).json({ error: "All fields required" });
  }

  await User.create({ name, mobile, university });
  res.json({ message: "Data saved successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
