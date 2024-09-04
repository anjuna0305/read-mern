import mongoose from "mongoose";

const POschema = new mongoose.Schema({
    POid: { type: String, required: true },
	date: { type: String, required: true },
    buyerName: { type: String, required: true },
    buyerContact: { type: String, required: true },
	items: [{ 
        itemCode: { type: String, required: true }, 
        description: { type: String, required: true }, 
        quantity: { type: Number, required: true }, 
        TaxRate: { type: Number, required: true }, 
        discoutRate: { type: Number, required: true }, 
        unitPrice: { type: Number, required: true } 
    }],
});

const PO = mongoose.model("PurchaseOrder", POschema);

export default PO;
