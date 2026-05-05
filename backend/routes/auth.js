const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret_key", {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
