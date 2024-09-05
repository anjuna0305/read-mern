import mongoose from 'mongoose';

const POschema = new mongoose.Schema({
  orderId: { type: String, required: true },
  orderDate: { type: String, required: true },
  customerName: { type: String, required: true },
  customerMobile: { type: String, required: true },
  items: [
    {
      itemCode: { type: String, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      taxRate: { type: Number, required: true },
      discountRate: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true }, 
    }
  ],
  totalValue: { type: Number, required: true }, 
  status: { type: String, required: true },  // Added status to store draft/submitted
});

const PO = mongoose.model('PurchaseOrder', POschema);

export default PO;
