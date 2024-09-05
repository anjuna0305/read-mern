import { Request, Response } from 'express'
import mongoose from 'mongoose'
import StockItem from '../models/stockItemModel'


// CREATE NEW STOCK ITEM
export const createStockItem = async (req: Request, res: Response) => {
    try {
        const { itemName, quantity, price, description } = req.body

        const newItem = new StockItem({
            itemName,
            quantity,
            price,
            description,
        })

        await newItem.save();
        res.status(201).json({ message: 'Stock item created successfully', newItem })
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: err.message })
        } else if (err instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: `Invalid value provided: ${err.value}` })
        } else if ((err as any).code === 11000) {
            res.status(409).json({ message: `Item with name "${req.body.itemName}" already exists.` })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}


// GET ALL STOCK ITEMS
export const getAllStockItems = async (req: Request, res: Response) => {
    try {
        const items = await StockItem.find()
        res.status(200).json(items)
    } catch (err: unknown) {
        res.status(500).json({ message: 'Failed to retrieve stock items', error: (err as Error).message })
    }
}


// GET STOCK ITEM BY ID
export const getStockItemById = async (req: Request, res: Response) => {
    try {
        const item = await StockItem.findById(req.params.id)
        if (!item) {
            return res.status(404).json({ message: 'Stock item not found' })
        }
        res.status(200).json(item)
    } catch (err: unknown) {
        res.status(500).json({ message: 'Failed to retrieve stock item', error: (err as Error).message })
    }
}


// UPDATE STOCK ITEM
export const updateStockItem = async (req: Request, res: Response) => {
    try {
        const { quantity, price, description } = req.body

        const updatedItem = await StockItem.findByIdAndUpdate(
            req.params.id,
            { quantity, price, description },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Stock item not found' })
        }

        res.status(200).json({ message: 'Stock item updated', updatedItem })
    } catch (err: unknown) {
        res.status(500).json({ message: 'Failed to update stock item', error: (err as Error).message })
    }
}


// DELETE STOCK ITEM
export const deleteStockItem = async (req: Request, res: Response) => {
    try {
        const deletedItem = await StockItem.findByIdAndDelete(req.params.id)
        if (!deletedItem) {
            return res.status(404).json({ message: 'Stock item not found' })
        }

        res.status(200).json({ message: 'Stock item deleted', deletedItem })
    } catch (err: unknown) {
        res.status(500).json({ message: 'Failed to delete stock item', error: (err as Error).message })
    }
}
