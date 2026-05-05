require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ["https://hiconcept-frontend.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// 🔗 Connect DB
const dbUri = process.env.MONGODB_URI;
console.log("Connecting to MongoDB using URI:", dbUri ? "Environment Variable Provided" : "Falling back to Localhost");

mongoose.connect(dbUri || "mongodb://127.0.0.1:27017/hiconcept")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => {
    console.error("MongoDB connection error details:", err);
    process.exit(1);
  });

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));