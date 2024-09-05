import express from "express";
import { Response, Request } from "express"
import { createStockItem, getAllStockItems, getStockItemById, updateStockItem, deleteStockItem } from "../controllers/stockController";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const testFunction = (req: Request, res: Response) => {
    res.status(200).json("greetings!");
}

const testFunction2 = (req: Request, res: Response) => {
    const body_was = req.body
    console.log(body_was)
    res.status(200).json(body_was);
}

router.get("/", testFunction)
router.get("/items", getAllStockItems)
router.get("/items/:id", getStockItemById)
router.put('/items/:id', updateStockItem)
router.delete('/items/:id', deleteStockItem)

export default router;
