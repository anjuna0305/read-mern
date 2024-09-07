import { Request, Response } from 'express'
import PO from '../models/POmodels'

interface PurchaseOrderData {
  poNumber: string
  date: string
  buyer: string
  buyerConNum: string
  status: string
  totalValue: number
  items: {
    itemCode: string
    description: string
    quantity: number
    unitPrice: number
    taxRate: number
    discountRate: number
    totalPrice: number
  }[]
}

// Utility function to round numbers
export const roundToTwo = (num: number): number => {
  return Math.round(num * 100) / 100
}

// Controller to create a new Purchase Order
export const createPurchaseOrder = async (req: Request, res: Response) => {
  const purchaseOrderData: PurchaseOrderData = req.body
  console.log('Received Purchase Order:', purchaseOrderData)

  // Convert totalValue to a number
  const totalValue = roundToTwo(purchaseOrderData.totalValue)

  // Map and round items' totalPrice to avoid floating-point precision issues
  const items = purchaseOrderData.items.map(item => ({
    itemCode: item.itemCode,
    description: item.description,
    quantity: item.quantity,
    taxRate: item.taxRate,
    discountRate: item.discountRate,
    unitPrice: item.unitPrice,
    totalPrice: roundToTwo(item.totalPrice),
  }))

  // Create new PO document using the cleaned data
  const newPurchaseOrder = new PO({
    orderId: purchaseOrderData.poNumber,
    orderDate: purchaseOrderData.date,
    customerName: purchaseOrderData.buyer,
    customerMobile: purchaseOrderData.buyerConNum,
    items,
    totalValue,
    status: purchaseOrderData.status,
  })

  try {
    await newPurchaseOrder.save()
    res.status(200).send({ message: 'Purchase Order received and saved successfully', data: newPurchaseOrder })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: 'Failed to save Purchase Order', error: error.message })
    } else {
      res.status(500).send({ message: 'Failed to save Purchase Order', error: 'Unknown error occurred' })
    }
  }
}

// Controller to get all Purchase Orders
export const getPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const purchaseOrders = await PO.find()
    res.status(200).json(purchaseOrders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Purchase Orders', error })
  }
}

// Controller to get a Purchase Order by ID
export const getPurchaseOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId
  try {
    const purchaseOrder = await PO.findOne({ orderId })
    if (purchaseOrder) {
      res.status(200).json(purchaseOrder)
    } else {
      res.status(404).json({ message: 'Purchase Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Purchase Order', error })
  }
}

// Controller to delete a Purchase Order by ID
export const deletePurchaseOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params
  try {
    const deletedPO = await PO.findOneAndDelete({ orderId })
    if (deletedPO) {
      res.status(200).json({ message: 'Purchase Order deleted successfully' })
    } else {
      res.status(404).json({ message: 'Purchase Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Purchase Order', error })
  }
}
