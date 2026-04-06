import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // 🔥 THE FIX: Aage check korbe image pathano hoyeche kina
    let image_filename = ""; 
    if (req.file) {
      image_filename = req.file.filename;
    }

    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }
    
    // Hash password & Create User
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image_filename, // Eita ekhon blank ("") nibe jodi chobi na dey
    });
    
    res.status(201).json({ message: "User created successfully", success: true, user });
  } catch (error) {
    console.log("Registration Error:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }
    
    // ⚠️ TYPO FIX: process.env.JWT_SCERECT ke JWT_SECRET kora holo
    // Oboshshoi nishchit koro tomar backend-er .env file-e JWT_SECRET=tomar_secret_key lekha ache
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.status(200).json({ message: "Login successful", success: true, token, user });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};