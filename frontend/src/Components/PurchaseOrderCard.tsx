import React from 'react';
import { Box, Typography } from '@mui/material';

interface PurchaseOrder {
  orderId: string;
  orderDate: string;
  customerName: string;
  totalValue: number;
  status: 'active' | 'draft' | 'completed';
}

const PurchaseOrderCard: React.FC<PurchaseOrder> = ({ orderId, orderDate, customerName, totalValue, status }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case 'active':
        return '#ADD8E6'; // light blue
      case 'completed':
        return '#D3D3D3'; // light gray
      case 'draft':
        return '#ADD8E6'; // light blue
      default:
        return '#fff';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'active':
        return '#FFFFFF'; // white
      case 'completed':
        return '#000000'; // black
      case 'draft':
        return '#FFFFFF'; // white
      default:
        return '#000';
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: status === 'draft' ? '2px solid black' : 'none',
        padding: 2,
        marginBottom: 2,
        fontSize: '0.8rem', 
        borderRadius: '8px',
      }}
    >
      <Typography variant="body2"><strong>Order ID:</strong> {orderId}</Typography>
      <Typography variant="body2"><strong>Order Date:</strong> {orderDate}</Typography>
      <Typography variant="body2"><strong>Customer Name:</strong> {customerName}</Typography>
      <Typography variant="body2"><strong>Total Value:</strong> ${totalValue.toFixed(2)}</Typography>
    </Box>
  );
};

export default PurchaseOrderCard;
