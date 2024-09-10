import axiosInstance from "./axiosInstance";
import { StockItem, CreateItemPayload, UpdateItemPayload } from "../interfaces";
import { AxiosError } from "axios";


// get all items
export const getAllItems = async () => {
    try {
        const response = await axiosInstance.get('/stock/items')
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// get item by id
export const getItemById = async (id: string): Promise<null | StockItem> => {
    try {
        const response = await axiosInstance.get(`stock/items/${id}`)
        return response.data as StockItem
    } catch (error) {
        return null
    }
}

// delete item
export const deleteItemById = async (id: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete(`stock/items/${id}`)
        return response ? true : false
    } catch (error) {
        return false
    }
}

// Add new item
export const createNewStockItem = async (payload: CreateItemPayload): Promise<StockItem | null> => {
    try {
        const response = await axiosInstance.post('stock/items/create', payload)
        return response.data.newItem as StockItem
    } catch (error) {
        return null
    }
}

// update item
export const updateStockItem = async (id: string, payload: UpdateItemPayload): Promise<StockItem | null> => {
    try {
        const response = await axiosInstance.put(`stock/items/${id}`, payload)
        return response.data.newItem as StockItem
    } catch (error) {
        return null
    }
}

// Search item
export const searchStockItem = async (itemName: string): Promise<StockItem[]> => {
    try {
        const response = await axiosInstance.get(`/stock/items/search?name=${itemName}`)
        return response.data as StockItem[]
    } catch (error) {
        return []
    }
}


// Restock 
export const restockItem = async (id: string, amount: number): Promise<StockItem | null> => {
    try {
        const response = await axiosInstance.put(`stock/items/${id}/restock`, { "restockAmount": amount })
        return response.data.item as StockItem
    } catch (error) {
        return null
    }
}