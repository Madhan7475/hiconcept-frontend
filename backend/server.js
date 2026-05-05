const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/hiconcept");

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const uploadRoutes = require("./routes/upload");
const serviceRoutes = require("./routes/services");

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api", uploadRoutes);
app.use("/api/services", serviceRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("Static uploads path:", path.join(__dirname, "uploads"));

// Contact API ROUTE
const Contact = require("./models/Contact");
app.post("/api/contact", async (req, res) => {
  const data = await Contact.create(req.body);
  res.json(data);
});

// Server start
app.listen(5000, () => console.log("Server running"));