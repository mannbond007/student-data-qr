const express = require("express");
const cors = require("cors");

const connectDB = require("../db");
const User = require("../User");

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

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* 🚨 REQUIRED FOR VERCEL */
module.exports = app;
