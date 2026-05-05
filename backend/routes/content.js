const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const { protect } = require("../middleware/auth");

// Get content by section
router.get("/:section", async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    if (!content) {
      return res.status(404).json({ message: "Content section not found" });
    }
    res.json(content.data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update content (Protected)
router.put("/:section", protect, async (req, res) => {
  try {
    const updatedContent = await Content.findOneAndUpdate(
      { section: req.params.section },
      { data: req.body },
      { new: true, upsert: true }
    );
    res.json(updatedContent.data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
