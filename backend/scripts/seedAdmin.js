/**
 * Create default admin user if missing. Run: node scripts/seedAdmin.js
 * Override with ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME in .env
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL || "admin@company.com";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";
  const name = process.env.ADMIN_NAME || "Admin";

  const existing = await UserModel.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    await mongoose.disconnect();
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);
  await UserModel.create({ name, email, password: hash, role: "admin" });
  console.log("Admin user created.");
  console.log("  Email:", email);
  console.log("  Name:", name);
  console.log("  Change ADMIN_PASSWORD in production.");

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
