const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function seedAdmin() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hiconcept");
    console.log("Connected to DB...");

    const adminUsername = "admin";
    const adminPassword = "Admin@123"; // Set your desired password

    const existingUser = await User.findOne({ username: adminUsername });
    if (existingUser) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    // 🔐 Password will be hashed by the User model's pre-save hook

    const admin = new User({
      username: adminUsername,
      password: adminPassword,
      role: "admin", // optional but recommended
    });

    await admin.save();

    console.log("--------------------------------------------------");
    console.log("✅ Admin User Created Successfully!");
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();