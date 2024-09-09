// src/routes/adminRoutes.ts
import express from 'express';
import { isAuthenticated, isAdmin } from '../authMiddleware';
import { addUser } from '../controllers/adminController';

const router = express.Router();

// Add User Route (Admin Only)
router.post('/add-user', addUser);

export default router;
