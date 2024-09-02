import express, { Application, Request, Response } from 'express';
import sampleRoute from './routes/sampleRoute';

const app: Application = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/sample', sampleRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js! This is an API endpoint');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 
