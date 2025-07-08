import bcrypt from "bcryptjs";
import User from "../users/user.schema.js";
import jwt from "jsonwebtoken";
import { JWT_KEY, GOOGLE_CLIENT_ID_BACKEND } from "../../config/variable.js";
import { OAuth2Client } from 'google-auth-library';

export const signup = async (req, res) => {
  try {
    const { username, email, password, birthDate } = req.body;

    //Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "invalid email or pwd",
      });
    }

    //hashing the pwd
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving user in database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      birthDate,
    });
    //response.send(user);
    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't have an account" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    let id = user._id;
    let token = jwt.sign({ id }, JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      id: user._id,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred during login." });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { id_token } = req.body;

    const client = new OAuth2Client(GOOGLE_CLIENT_ID_BACKEND);
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID_BACKEND,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google token: email missing." });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    // If user doesn't exist, create one
    if (!user) {
      user = await User.create({
        email,
        username: name,
        avatar: picture,
        password: null,
        googleId: sub,
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      token,
      id: user._id,
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
      },
    });

  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(500).json({ message: "Google authentication failed." });
  }
};
