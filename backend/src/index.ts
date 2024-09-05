import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { 
  createPurchaseOrder, 
  getPurchaseOrders, 
  getPurchaseOrderById, 
  deletePurchaseOrder 
} from './controllers/POcontroller'; // Importing controller functions

const app: Application = express();
const port = process.env.PORT || 5000;

// Use local MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/READ-Mern';

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js! This is an API endpoint');
});

// Purchase Order routes
app.post('/api/purchase-orders', createPurchaseOrder); // POST: Create Purchase Order
app.get('/api/purchase-orders', getPurchaseOrders); // GET: Fetch all Purchase Orders
app.get('/api/purchase-orders/:orderId', getPurchaseOrderById); // GET: Fetch PO by ID
app.delete('/api/purchase-orders/:orderId', deletePurchaseOrder); // DELETE: Delete PO

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
