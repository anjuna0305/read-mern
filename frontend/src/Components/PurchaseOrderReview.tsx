import React from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';

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
  const [open, setOpen] = React.useState(false);

  const getTotalPrice = (quantity: number, unitPrice: number, taxRate: number, discountRate: number) => {
    const price = quantity * unitPrice;
    const tax = price * taxRate;
    const discount = price * discountRate;
    totalValue = price + tax - discount +totalValue;
    return price + tax - discount;
  }

  // const calculateTotalPrice = () => {
  //   return items
  //     .reduce((acc, item) => acc + item.totalPrice, 0)
  //     .toFixed(2);
  // };

const handleDeleteClick = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleConfirmDelete = () => {
    onDelete();
    setOpen(false);
};

console.log("PurchaseOrderProps", items ,orderId, orderDate, customerName, customerMobile, totalValue, status, onModify, onSubmit, onDelete); // Remove this line
  return (
    <Box sx={{ padding: 3, backgroundColor: '#f0f4f7',maxWidth: 870, borderRadius: 4, boxShadow: 3 }}>
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
            {items.map((item, index) => (
              index % 2 === 0 ? (
                <OddTableRow key={item.itemId}>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.itemId}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.description}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.quantity}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{item.unitPrice }</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{(item.taxRate * 100).toFixed(2)}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{getTotalPrice(item.quantity,item.unitPrice,item.taxRate,item.discountRate)}</TableCell>
                </OddTableRow>
              ) : (
                <EvenTableRow key={item.itemId}>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.itemId}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.description}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.quantity}</TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{item.unitPrice }</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{(item.taxRate * 100).toFixed(2)}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>Rs.{getTotalPrice(item.quantity,item.unitPrice,item.taxRate,item.discountRate)}</TableCell>
                </EvenTableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total PO Value: Rs.{totalValue.toFixed(2)}
        </Typography>
      </Box>

      {status === 'draft' && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={onModify}>Modify</Button>
          <Button variant="contained" color="success" onClick={onSubmit}>Submit</Button>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>Delete</Button>
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
