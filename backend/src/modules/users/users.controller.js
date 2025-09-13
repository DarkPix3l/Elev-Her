import User from '../users/user.schema.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { SUPABASE_AVATAR_URL } from '../../config/variable.js';
import supabase from '../../lib/superbaseClient.js';

const DEFAULT_AVATAR = `${SUPABASE_AVATAR_URL}/user-profile.jpg`;
const SUPABASE_BUCKET_NAME = SUPABASE_AVATAR_URL.split('/').pop();
const DEFAULT_AVATAR_FILENAME = 'user-profile.jpg';

//GET
export const getUsers = async (req, res) => {
  try {
    // Exclude password from the returned user data for security reasons
    // We never send password hashes to the client, even if hashed, to protect user privacy
    const userList = await User.find().select('-password');

    if (!userList) {
      return res.status(404).json({ success: false, message: 'users not found' });
    }

    res.status(200).send(userList);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

//GET
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'The user with the given ID was not found.' });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//POST
export const createUser = async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists.');
    }

    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    let user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: passwordHash,
      address: req.body.address,
      role: req.body.role,
      avatar: DEFAULT_AVATAR,
    });

    user = await user.save();

    if (!user) {
      return res.status(500).send('The user could not be created!');
    }

    res.status(201).send({
      message: 'User created successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

//POST
export const updateUser = async (req, res) => {
  try {
    const userExist = await User.findById(req.params.id);
    if (!userExist) {
      return res.status(404).send('User not found.');
    }
    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = userExist.password;
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

    if (!user) return res.status(400).send('the user cannot be created!');

    res.send(user);
  } catch {
    // Generic server error
    res.status(500).send('server.');
  }
};

//PATCH
export const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No avatar file provided.' });
    }

    const file = req.file;
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const bucketName = SUPABASE_BUCKET_NAME;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload avatar to Supabase.',
        error: uploadError.message,
      });
    }

    const newAvatarUrl = `${SUPABASE_AVATAR_URL}/${fileName}`;

    if (user.avatar) {
      const oldFileName = user.avatar.split('/').pop();

      if (user.avatar.startsWith(SUPABASE_AVATAR_URL) && oldFileName !== DEFAULT_AVATAR_FILENAME) {
        try {
          const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([oldFileName]);

          if (deleteError) {
            console.warn(
              `Failed to delete old avatar '${oldFileName}' from Supabase:`,
              deleteError.message
            );
          }
        } catch (e) {
          console.warn('Error attempting to delete old avatar:', e.message);
        }
      }
    }

    user.avatar = newAvatarUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully!',
      avatarUrl: newAvatarUrl,
    });
  } catch (error) {
    console.error('Error updating user avatar:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during avatar update.',
      error: error.message,
    });
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // If deleting a user, ensure their custom avatar is deleted, but not the default
    if (
      user.avatar &&
      user.avatar.startsWith(SUPABASE_AVATAR_URL) &&
      user.avatar.split('/').pop() !== DEFAULT_AVATAR_FILENAME
    ) {
      try {
        const oldFileName = user.avatar.split('/').pop();
        const { error: deleteError } = await supabase.storage
          .from(SUPABASE_BUCKET_NAME)
          .remove([oldFileName]);
        if (deleteError)
          console.warn(
            "Failed to delete user's custom avatar on user deletion:",
            deleteError.message
          );
      } catch (e) {
        console.warn("Error during user's avatar deletion on user deletion:", e.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'The user has been deleted.',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'call the dev',
    });
  }
};
