const mongoose = require("mongoose");
require("dotenv").config();

const Content = require("./models/Content");

async function seedContent() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hiconcept");
    console.log("Connected to DB...");

    const initialContent = [
      {
        section: "home",
        data: {
          heroTitle: "Welcome to HiConcept",
          heroSubtitle: "Innovating the future of digital experiences",
          ctaText: "Get Started",
          features: [
            { title: "Fast Performance", description: "Blazing fast load times for your users." },
            { title: "Secure by Default", description: "Enterprise-grade security integrated." },
            { title: "Modern Design", description: "Sleek and intuitive user interfaces." },
          ],
        },
      },
      {
        section: "global",
        data: {
          siteName: "HiConcept",
          footerText: "© 2026 HiConcept. All rights reserved.",
          contactEmail: "info@hiconcept.com",
          navLinks: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ],
        },
      },
    ];

    for (const item of initialContent) {
      await Content.findOneAndUpdate(
        { section: item.section },
        { data: item.data },
        { upsert: true, new: true }
      );
    }

    console.log("--------------------------------------------------");
    console.log("✅ Initial Content Seeded Successfully!");
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding content:", err);
    process.exit(1);
  }
}

seedContent();
