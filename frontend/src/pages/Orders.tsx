import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePO from "../Components/CreatePO";
import POSearchBar from "../Components/POSearchBar";
import PurchaseOrderCard from '../Components/PurchaseOrderCard';
import PurchaseOrderReview from "../Components/PurchaseOrderReview";
import Left from "../Containers/Left";
import Middle from "../Containers/Middle";
import Right from "../Containers/Right";

type PurchaseOrder = {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerMobile: string;
  totalValue: number;
  status: string;
  items: {
    itemCode: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    discountRate: number;
    totalPrice: number;
  }[];
};

// Fetch PO by orderId from the backend
const fetchPurchaseOrderById = async (orderId: string): Promise<PurchaseOrder | null> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/purchase-orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching PO with ID ${orderId}:`, error);
    return null;
  }
};

const Orders: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [poData, setPoData] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/purchase-orders');
        setPurchaseOrders(response.data);
        console.log('Purchase Orders:', response.data);
      } catch (error) {
        console.error('Error fetching Purchase Orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  // Function to handle clicking a PO card and fetching its details
  const handlePOCardClick = async (orderId: string) => {
    console.log('PO card clicked', orderId);
    const fetchedPO = await fetchPurchaseOrderById(orderId); // Fetch PO details
    if (fetchedPO) {
      setPoData(fetchedPO);
      setSelectedPO(orderId);
    } else {
      console.error('No PO found for ID:', orderId);
    }
  };

  return (
    <div>
      <Left>
        <h1>Orders Management</h1>
      </Left>
      <Middle>
        {!selectedPO ? (
          <CreatePO />
        ) : (
          <PurchaseOrderReview
            orderId={poData?.orderId || ''}
            orderDate={poData?.orderDate || ''}
            customerName={poData?.customerName || ''}
            customerMobile={poData?.customerMobile || ''}
            items={poData?.items || []}
            totalValue={poData?.totalValue || 0}
            status={poData?.status || ''}
            onModify={() => console.log('Modify clicked')}
            onSubmit={() => console.log('Submit clicked')}
            onDelete={() => {
              console.log('Delete clicked');
              setSelectedPO(null); // Deselect the PO
            }}
          />
        )}
      </Middle>
      <Right>
        <POSearchBar onSearch={(poId: string) => console.log(poId)} />
        <Container sx={{
          overflow: 'auto',
          maxHeight: 'calc(100vh - 150px)',
        }}>
          {purchaseOrders.map((po) => (
            <PurchaseOrderCard
              key={po.orderId}
              orderId={po.orderId}
              orderDate={po.orderDate}
              customerName={po.customerName}
              totalValue={po.totalValue}
              status={po.status}
              onClick={() => handlePOCardClick(po.orderId)} // Call to fetch the PO details
            />
          ))}
        </Container>
      </Right>
    </div>
  );
};

export default Orders;
