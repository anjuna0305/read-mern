import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedItems, setModifiedItems] = useState([...items]);
  const [newItem, setNewItem] = useState({ description: '', quantity: 0 });

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleAddItem = () => {
    setModifiedItems([...modifiedItems, { ...newItem, itemId: `new-`, unitPrice: 0, taxRate: 0, discountRate: 0, totalPrice: 0 }]);
    setNewItem({ description: '', quantity: 0 });
  };

  const handleRemoveItem = (itemId: string) => {
    setModifiedItems(modifiedItems.filter((item) => item.itemId !== itemId));
  };

  const handleCancel = () => {
    setModifiedItems([...items]);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/opurchase-orders/${orderId}`, {
        orderId,
        items: modifiedItems,
      });
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating Purchase Order:', error);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setModifiedItems(
      modifiedItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

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
    onDelete();  
    setOpen(false);
  } catch (error) {
    console.error('Error deleting Purchase Order:', error);
  }
};

useEffect(() => {
  setModifiedItems([...items]);
}
, [items]);



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
            {modifiedItems.map((item, index) => (
              index % 2 === 0 ? (
                <OddTableRow key={item.itemId}>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.itemId}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.description}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value, 10))}
                      />
                    ) : (
                      item.quantity
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{item.unitPrice}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{(item.taxRate * 100).toFixed(2)}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{getTotalPrice(item.quantity, item.unitPrice, item.taxRate, item.discountRate)}</TableCell>
                  {isEditing && (
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => handleRemoveItem(item.itemId)}>
                        Remove
                      </Button>
                    </TableCell>
                  )}
                </OddTableRow>
              ) : (
                <EvenTableRow key={item.itemId}>
                <TableCell sx={{ fontSize: '0.9rem' }}>{item.itemId}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>{item.description}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value, 10))}
                    />
                  ) : (
                    item.quantity
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{item.unitPrice}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>{(item.taxRate * 100).toFixed(2)}%</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{getTotalPrice(item.quantity, item.unitPrice, item.taxRate, item.discountRate)}</TableCell>
                {isEditing && (
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleRemoveItem(item.itemId)}>
                      Remove
                    </Button>
                  </TableCell>
                )}
                </EvenTableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEditing && (
        <>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <TextField
              label="Item Name"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              sx={{ marginRight: 2 }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
            />
            <Button variant="contained" onClick={handleAddItem} sx={{ marginLeft: 2 }}>Add Item</Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleCancel} sx={{ marginRight: 2 }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
          </Box>
        </>
      )}

      {status === 'draft' && !isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleModifyClick}>Modify</Button>
          <Button variant="contained" color="success" onClick={onSubmit}>Submit</Button>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>Delete</Button>
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Purchase Order? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
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
