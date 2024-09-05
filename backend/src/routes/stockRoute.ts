import express from "express"
import { createStockItem, getAllStockItems, getStockItemById, updateStockItem, deleteStockItem } from "../controllers/stockController"

const router = express.Router()

router.get("/items", getAllStockItems)
router.get("/items/:id", getStockItemById)
router.post("/items/create", createStockItem)
router.put('/items/:id', updateStockItem)
router.delete('/items/:id', deleteStockItem)

export default router
