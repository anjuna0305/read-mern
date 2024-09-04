import mongoose from "mongoose";

const POschema = new mongoose.Schema({
    orderId: { type: String, required: true },  // Changed from POid to orderId
    orderDate: { type: String, required: true },  // Changed from date to orderDate
    customerName: { type: String, required: true },  // Changed from buyerName to customerName
    customerMobile: { type: String, required: true },  // Added customerMobile
    items: [{ 
        itemCode: { type: String, required: true }, 
        description: { type: String, required: true }, 
        quantity: { type: Number, required: true }, 
        taxRate: { type: Number, required: true },  // Renamed TaxRate to taxRate
        discountRate: { type: Number, required: true },  // Renamed discoutRate to discountRate
        unitPrice: { type: Number, required: true } 
    }],
    totalValue: { type: Number, required: true },  // Added totalValue
    status: { type: String, required: true },  // Added status
});

const PO = mongoose.model("PurchaseOrder", POschema);

export default PO;
