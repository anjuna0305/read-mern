import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import './auth'; // Import Passport config for authentication

import stockRoutes from './routes/stockRoute';
import PORouts from './routes/POrouts';
import authRoutes from './routes/authRoutes';
import adminRouts from './routes/adminRouts';


dotenv.config();

const app: Application = express(); // Initialize Express application

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies)
}));

// Session and Passport setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
app.use('/auth', authRoutes); 
app.use("/stock", stockRoutes); 
app.use('/admin', adminRouts);
app.use('/api', PORouts); 

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Node.js!');
});

app.get('/api', (req, res) => {
    res.send('Hello, TypeScript with Node.js! This is an API endpoint');
});

const PORT = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_URL ? process.env.MONGO_URL : '';

mongoose
    .connect(mongo_url)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
// src/index.ts

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  