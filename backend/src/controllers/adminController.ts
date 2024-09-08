// src/controllers/adminController.ts
import { Request, Response } from 'express';
import User from '../models/User';

// Add User Controller
export const addUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const newUser = new User({
    username,
      email,
      password,
      role: role === 'Stock Manager' ? 'stock_manager' : role.toLowerCase(),
    });

    await newUser.save();

    res.status(200).json({ message: 'User added successfully.', user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Error adding user.', error: error.message });
  }
};
