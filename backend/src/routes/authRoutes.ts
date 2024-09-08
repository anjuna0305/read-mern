import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';


const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err:any, user:any, info:any) => {
    if (err) {
      return res.status(500).json({ message: 'Server error occurred' });
    }
    if (!user) {
      // Send the error message received from the `LocalStrategy` (e.g., incorrect username/password)
      return res.status(401).json({ message: info?.message || 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed due to server error' });
      }
      return res.status(200).json({
        message: 'Login successful',
        user,
      });
    });
  })(req, res, next);
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Check if the user is authenticated
router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

export default router;
