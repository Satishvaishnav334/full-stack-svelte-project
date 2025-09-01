import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private"; // load private env vars

let conn = null;

export async function connectDB() {
  // if (conn) return conn;

  try {
    conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
