import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Initialize the express application
const app: Application = express();
const port = process.env.PORT || 5000;

// Replace <db_password> with your actual database password
const mongoURI = 'mongodb+srv://mjpavithra6520:<db_password>@read-mern-mj.2g1sr.mongodb.net/?retryWrites=true&w=majority&appName=Read-MERN-MJ';

// Middleware
app.use(express.json());

// Configure CORS to allow requests from your front-end origin
app.use(cors({
  origin: 'http://localhost:5173',  // Replace this with the correct port where your front-end is running
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests
}));

// MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

// API base route
app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js! This is an API endpoint');
});

// POST route for receiving purchase orders
app.post('/api/purchase-orders', (req: Request, res: Response) => {
  const purchaseOrderData = req.body;
  console.log('Received Purchase Order:', purchaseOrderData);

  // You can further process the data here, like saving it to a database.

  res.status(200).send({ message: 'Purchase Order received successfully', data: purchaseOrderData });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
