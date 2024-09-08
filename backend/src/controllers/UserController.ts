import express, { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { Session } from 'express-session'; // Import the Session type from 'express-session'


const router = express.Router();

// Registration Route
// ...

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        // Cast the req.session object to the Session type
        (req.session as Session).userId = newUser._id;  // Start session
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration.', error });
    }
  }
});


const createUser = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const newUser = new User({
    username: 'admin',
    password: hashedPassword,
    role: 'admin',
  });

  await newUser.save();
};

createUser().then(() => console.log('User created'));


// Login Route
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    req.session.userId = user._id;  // Start session
    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error during login.', error });
  }
});

// Logout Route
router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');  // Clear session cookie
    res.status(200).json({ message: 'Logout successful.' });
  });
});

// Get Logged-in User
router.get('/me', async (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data.', error });
  }
});

export default router;
