const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

function isValidPassword(pw) {
  return typeof pw === "string" && pw.length >= 8 && /\d/.test(pw);
}

router.post("/register", async (req, res) => {
  try {
    const { username, password, confirmPassword, acceptedTerms } = req.body;

    if (!username || username.trim().length < 3) {
      return res.status(400).json({ field: "username", message: "Invalid username." });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ field: "password", message: "Password must be 8+ chars and include a number." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ field: "confirmPassword", message: "Passwords do not match." });
    }

    if (!acceptedTerms) {
      return res.status(400).json({ field: "acceptedTerms", message: "You must accept the terms." });
    }

    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      return res.status(409).json({ field: "username", message: "Username already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.trim(),
      passwordHash
    });

    req.session.userId = user._id;
    req.session.username = user.username;

    return res.json({
      message: "Registered",
      user: { id: user._id, username: user.username }
    });

  } catch (err) {
    if (err && err.code === 11000) {
  return res.status(409).json({ field: "username", message: "Username already exists." });
}
return res.status(500).json({ message: "Server error" });

  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username?.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    return res.json({
      message: "Logged in",
      user: { id: user._id, username: user.username }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  return res.json({
    user: {
      id: req.session.userId,
      username: req.session.username
    }
  });
});

module.exports = router;
