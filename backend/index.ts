import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app: Application = express();
const port = process.env.PORT || 5000;
import PO from './src/models/POmodels';

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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js! This is an API endpoint');
});

interface PurchaseOrderData {
  poNumber: string;
  date: string;
  buyer: string;
  buyerConNum: string;
  status: string;
  totalValue: number; // This should be a number after conversion
  items: {
    itemCode: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    discountRate: number;
    totalPrice: number;
  }[];
}

// Utility function to round numbers
const roundToTwo = (num: number): number => {
  return Math.round(num * 100) / 100;
};

// POST endpoint to save the purchase order
app.post('/api/purchase-orders', async (req: Request, res: Response) => {
  const purchaseOrderData: PurchaseOrderData = req.body;
  console.log('Received Purchase Order:', purchaseOrderData);

  // Convert totalValue to a number
  const totalValue = roundToTwo(purchaseOrderData.totalValue);

  // Map and round items' totalPrice to avoid floating-point precision issues
  const items = purchaseOrderData.items.map(item => ({
    itemCode: item.itemCode,
    description: item.description,
    quantity: item.quantity,
    taxRate: item.taxRate,
    discountRate: item.discountRate,
    unitPrice: item.unitPrice,
    totalPrice: roundToTwo(item.totalPrice),
  }));

  // Create new PO document using the cleaned data
  const newPurchaseOrder = new PO({
    orderId: purchaseOrderData.poNumber,
    orderDate: purchaseOrderData.date,
    customerName: purchaseOrderData.buyer,
    customerMobile: purchaseOrderData.buyerConNum,
    items,
    totalValue,  // No need for toFixed here
    status: purchaseOrderData.status,
  });

  try {
    await newPurchaseOrder.save();
    res.status(200).send({ message: 'Purchase Order received and saved successfully', data: newPurchaseOrder });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: 'Failed to save Purchase Order', error: error.message });
    } else {
      res.status(500).send({ message: 'Failed to save Purchase Order', error: 'Unknown error occurred' });
    }
  }
});

// GET endpoint to fetch all purchase orders
app.get('/api/purchase-orders', async (req: Request, res: Response) => {
  try {
    const purchaseOrders = await PO.find();
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Purchase Orders', error });
  }
});

app.get('/api/purchase-orders/:orderId', async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  try {
    const purchaseOrder = await PO.findOne
    ({ orderId });
    if (purchaseOrder) {
      res.status(200).json(purchaseOrder);
    } else {
      res.status(404).json({ message: 'Purchase Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Purchase Order', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
