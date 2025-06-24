//user.controller for profiles, update user data
import User from "../users/user.schema.js";
import bcrypt from "bcryptjs";
//for now
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config/variable.js";

//GET
export const getUsers = async (req, res) => {
  try {
    // Exclude password from the returned user data for security reasons
    // We never send password hashes to the client, even if hashed, to protect user privacy
    const userList = await User.find().select("-password");

    if (!userList) {
      return res
        .status(404)
        .json({ success: false, message: "users not found" });
    }

    res.status(200).send(userList);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "The user with the given ID was not found." });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//POST - for admin/manager (in case dashboard controller will be created)
export const createUser = async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    let user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: passwordHash,
      address: req.body.address,
      shippingAddress: req.body.shippingAddress,
      role: req.body.role,
    });

    user = await user.save();

    if (!user) {
      return res.status(500).send("The user could not be created!");
    }

    res.status(201)
    .send({
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//PUT
export const updateUser = async (req, res) => {
  try {
  const userExist = await User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: newPassword,
      address: req.body.address,
      shippingAddress: req.body.shippingAddress,
    },
    { new: true }
  );

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
}catch{
 // Generic server error
  res.status(500).send("server.");
}
};

//DELETE
export const deleteUser = async (req, res) => {
  try {

/*     if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ // 403 Forbidden
        success: false,
        message: "Nice try"
      });
    } */
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "The user has been deleted.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "call the dev"
    });
  }
};
