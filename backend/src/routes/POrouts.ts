import express from "express"
import { createPurchaseOrder, getPurchaseOrderById, getPurchaseOrders, deletePurchaseOrder } from "../controllers/POcontroller"


const PORouts = express.Router()

PORouts.post('/purchase-orders', createPurchaseOrder)
PORouts.get('/purchase-orders', getPurchaseOrders)
PORouts.get('/purchase-orders/:orderId', getPurchaseOrderById)
PORouts.delete('/purchase-orders/:orderId', deletePurchaseOrder)


export default PORouts
