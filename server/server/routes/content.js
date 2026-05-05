const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get content by section
router.get('/:section', async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    res.json(content ? content.data : {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update content
router.put('/:section', async (req, res) => {
  try {
    const updatedContent = await Content.findOneAndUpdate(
      { section: req.params.section },
      { data: req.body },
      { upsert: true, new: true }
    );
    res.json(updatedContent.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
