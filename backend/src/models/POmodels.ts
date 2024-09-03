import mongoose from "mongoose";

const POschema = new mongoose.Schema({
    POid: String,
	date: String,
    buyerName: String,
    buyerContact: String,

	items: [{ itemCode: String, description: String, quantity: Number, TaxRate: Number, discoutRate: Number, unitPrice: Number }],
});

const PO = mongoose.model("PurchaseOrder", POschema);

export default PO;