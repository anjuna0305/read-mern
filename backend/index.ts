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

app.post('/api/purchase-orders', async (req: Request, res: Response) => {
  const purchaseOrderData = req.body;
  console.log('Received Purchase Order:', purchaseOrderData);

  const newPurchaseOrder = new PO({
    POid: purchaseOrderData.poNumber,
    date: purchaseOrderData.date,
    buyerName: purchaseOrderData.buyer,
    buyerContact: purchaseOrderData.buyerConNum,
    items: purchaseOrderData.items
  });

  try {
    await newPurchaseOrder.save();
    res.status(200).send({ message: 'Purchase Order received and saved successfully', data: newPurchaseOrder });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save Purchase Order' });
  }
});

app.get('/api/purchase-orders', async (req: Request, res: Response) => {
  try {
      const purchaseOrders = await PO.find();
      res.status(200).json(purchaseOrders);
  } catch (error) {
      res.status(500).json({ message: 'Sorry...........Failed to fetch Purchase Orders', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});