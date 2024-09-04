import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Initialize the express application
const app: Application = express();
const port = process.env.PORT || 5000;
import PO from './src/models/POmodels'; 

// Replace <db_password> with your actual database password admin@123
const mongoURI = 'mongodb+srv://admin:admin@123@read-mern.bavza.mongodb.net/?retryWrites=true&w=majority&appName=Read-Mern';

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
app.post('/api/purchase-orders', async (req: Request, res: Response) => {
  const purchaseOrderData = req.body;
  console.log('Received Purchase Order:', purchaseOrderData);

  // Create a new Purchase Order instance with the received data
  const newPurchaseOrder = new PO({
    POid: purchaseOrderData.poNumber,
    date: purchaseOrderData.date,
    buyerName: purchaseOrderData.buyer,
    buyerContact: purchaseOrderData.buyerConNum,
    items: purchaseOrderData.items
  });

  try {
    // Save the new purchase order to the database
    await newPurchaseOrder.save();
    res.status(200).send({ message: 'Purchase Order received and saved successfully', data: newPurchaseOrder });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save Purchase Order',  });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
