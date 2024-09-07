import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import helmet from "helmet"
import stockRoutes from "./routes/stockRoute"
import PORouts from './routes/POrouts'
import {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    deletePurchaseOrder
} from './controllers/POcontroller' // Importing controller functions


/* CONFIGURATIONS */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))


/* ROUTES */
app.use("/stock", stockRoutes)


// Basic routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Node.js!')
})

app.get('/api', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Node.js! This is an API endpoint')
})

app.use('/api', PORouts)


const PORT = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL ? process.env.MONGO_URL : ""

mongoose
    .connect(mongo_url)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`))
