import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function signup(req, res) {
  

  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.json({ message: "Please fill all fields" });
    }

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    const savedUser=await newUser.save();
    const token = jwt.sign(
      { id:savedUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    
    res.json({ message: "User registered successfully",token:token, userId:savedUser._id });

  } catch (err) {
    return res.status(500).send("server error");
  }
}


async function login(req, res) {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "credential error" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      success:true,
      token,
      userId: user._id,
      role:user.role,
    });

  } catch (err) {
    return res.status(500).send("server error");
  }
}

export default { signup, login };