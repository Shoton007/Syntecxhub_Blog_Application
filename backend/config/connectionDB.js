import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // MONGO_URL kete MONGO_URI kora hoyeche
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully! 🎉");
  } catch (error) {
    // Vobishotte kono error ashle jate ashol karon ta print hoy
    console.log("MongoDB Connection Error:", error.message);
  }
};