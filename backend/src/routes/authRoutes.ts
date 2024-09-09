import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/me', (req, res) => {
  console.log('req.isAuthenticated()', req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ user: null, message: 'Not authenticated ***' });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user:any, info:any) => {
        if (err) {
            return next(err); // Handle any internal errors
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Handle session setup error
            }
            return res.status(200).json({
                message: 'Login successful***',
                user: user,
            });
        });
    })(req, res, next);
});

// Endpoint to handle logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

export default router;
