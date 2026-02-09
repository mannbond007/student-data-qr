require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const User = require("./User");

const app = express();

/* =======================
   ✅ CORS CONFIGURATION
   ======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://your-frontend.vercel.app", // production frontend (change later)
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

/* =======================
   ✅ DATABASE
   ======================= */
connectDB();

/* =======================
   ✅ ROUTES
   ======================= */

// Register user
app.post("/register", async (req, res) => {
  try {
    const { name, mobile, university } = req.body;

    if (!name || !mobile || !university) {
      return res.status(400).json({ error: "All fields required" });
    }

    await User.create({ name, mobile, university });
    res.json({ message: "Data saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔥 GET USERS (THIS WAS MISSING)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/* =======================
   ✅ SERVER
   ======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
