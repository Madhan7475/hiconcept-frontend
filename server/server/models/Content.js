const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // 'home' or 'global'
  data: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
