import React, { useState } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const OddTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey?.[200] || '#e0e0e0',
}));

const EvenTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey?.[50] || '#f5f5f5',
}));

interface Item {
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountRate: number;
  totalPrice: number;
}

interface PurchaseOrderProps {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerMobile: string;
  items?: Item[]; 
  totalValue: number;
  status: 'draft' | 'completed';
  onModify: () => void;
  onSubmit: () => void;
  onDelete: () => void;
}

const PurchaseOrderReview: React.FC<PurchaseOrderProps> = ({
  orderId,
  orderDate,
  customerName,
  customerMobile,
  items = [],
  totalValue = 0,
  status,
  onModify,
  onSubmit,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [editedItems, setEditedItems] = useState<Item[]>(items);  // State to handle edits
  const [originalItems, setOriginalItems] = useState<Item[]>([...items]);  // Store original items before modification
  const [newItemId, setNewItemId] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);

  const getTotalPrice = (quantity: number, unitPrice: number, taxRate: number, discountRate: number) => {
    const price = quantity * unitPrice;
    const tax = price * taxRate;
    const discount = price * discountRate;
    return price + tax - discount;
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/purchase-orders/${orderId}`);
      onDelete();  // Call the parent's onDelete to update the state
      setOpen(false);
    } catch (error) {
      console.error('Error deleting Purchase Order:', error);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...editedItems];
    updatedItems[index].quantity = quantity;
    setEditedItems(updatedItems);
  };

  const handleAddNewItem = () => {
    const newItem: Item = {
      itemId: newItemId,
      description: 'New Item',  // Placeholder, can be updated later
      quantity: newItemQuantity,
      unitPrice: 0, // Default, can be updated later
      taxRate: 0,
      discountRate: 0,
      totalPrice: 0,
    };
    setEditedItems([...editedItems, newItem]);
    setNewItemId('');
    setNewItemQuantity(1);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = editedItems.filter((_, i) => i !== index);
    setEditedItems(updatedItems);
  };

  const handleCancel = () => {
    setEditedItems([...originalItems]); // Reset to the original items
  };

  const handleSubmit = () => {
    // Update total value and proceed with submission
    onSubmit();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f0f4f7', maxWidth: 870, borderRadius: 4, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Purchase Order Review
      </Typography>
      <Typography variant="body2"><strong>PO ID:</strong> {orderId}</Typography>
      <Typography variant="body2"><strong>PO Date:</strong> {orderDate}</Typography>
      <Typography variant="body2"><strong>Customer Name:</strong> {customerName}</Typography>
      <Typography variant="body2"><strong>Customer Mobile:</strong> {customerMobile}</Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 'none' }}>
        <Table>
          <TableBody>
            {editedItems.map((item, index) => (
              index % 2 === 0 ? (
                <OddTableRow key={item.itemId}>
                  <TableCell>{item.itemId}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      sx={{ width: '60px' }}
                    />
                  </TableCell>
                  <TableCell>Rs.{item.unitPrice}</TableCell>
                  <TableCell>{(item.taxRate * 100).toFixed(2)}%</TableCell>
                  <TableCell>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                  <TableCell>Rs.{getTotalPrice(item.quantity, item.unitPrice, item.taxRate, item.discountRate)}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleRemoveItem(index)}>Remove</Button>
                  </TableCell>
                </OddTableRow>
              ) : (
                <EvenTableRow key={item.itemId}>
                  <TableCell>{item.itemId}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      sx={{ width: '60px' }}
                    />
                  </TableCell>
                  <TableCell>Rs.{item.unitPrice}</TableCell>
                  <TableCell>{(item.taxRate * 100).toFixed(2)}%</TableCell>
                  <TableCell>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                  <TableCell>Rs.{getTotalPrice(item.quantity, item.unitPrice, item.taxRate, item.discountRate)}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleRemoveItem(index)}>Remove</Button>
                  </TableCell>
                </EvenTableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total PO Value: Rs.{editedItems.reduce((acc, item) => acc + getTotalPrice(item.quantity, item.unitPrice, item.taxRate, item.discountRate), 0).toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Item ID"
          value={newItemId}
          onChange={(e) => setNewItemId(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Quantity"
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleAddNewItem}>Add Item</Button>
      </Box>

      {status === 'draft' && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={onModify}>Modify</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>Delete</Button>
          <Button variant="contained" onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Purchase Order? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PurchaseOrderReview;
