import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// next is for passing errors to error handling middleware
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400); // Bad Request, meaning the client sent something wrong
      throw new Error("User already exists with this email");
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: `User registered successfully with email: ${user.email}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error); // pass the error to the error handling middleware
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalud email or password");
    }

    // jwt token generation can be added here for session management
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // options
    );

    res.status(200).json({
      success: true,
      message: `Login successful with email ${email}`,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error); // pass the error to the error handling middleware
  }
};

export { register, login };
