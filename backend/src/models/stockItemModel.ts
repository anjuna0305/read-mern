import mongoose from 'mongoose';

const stockItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        index: true,
        unique: true,
        minlength: [3, 'Item name must be at least 3 characters long'],
        maxlength: [100, 'Item name cannot exceed 100 characters'],
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
}, { timestamps: true });

const StockItem = mongoose.model("StockItem", stockItemSchema);

export default StockItem;   
