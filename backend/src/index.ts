import express, { Application, Request, Response } from 'express';
import sampleRoute from './routes/sampleRoute';

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/sample', sampleRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
